<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;

        $users = User::with('roles')
            ->when(
                $search,
                fn($q) =>
                $q->where(
                    'name',
                    'like',
                    "%{$search}%"
                )
            )
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render(
            'users/index',
            [
                'users' => $users,

                'filters' => [
                    'search' => $search,
                ],
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render(
            'users/create',
            [
                'roles' => Role::all(),
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated =
            $request->validate([
                'name' => [
                    'required',
                    'string',
                ],

                'email' => [
                    'required',
                    'email',
                    'unique:users,email',
                ],

                'password' => [
                    'required',
                    'min:8',
                ],

                'role' => [
                    'required',
                ],
            ]);

        $user = User::create([
            'name' =>
            $validated['name'],

            'email' =>
            $validated['email'],

            'password' =>
            $validated['password'],
        ]);

        $user->assignRole(
            $validated['role']
        );

        return redirect()
            ->route('users.index')
            ->with(
                'success',
                'User berhasil ditambahkan.'
            );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render(
            'users/edit',
            [
                'user' => $user->load(
                    'roles'
                ),

                'roles' =>
                Role::all(),
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        Request $request,
        User $user
    ) {
        $validated =
            $request->validate([
                'name' => [
                    'required',
                    'string',
                ],

                'email' => [
                    'required',
                    'email',
                    Rule::unique(
                        'users',
                        'email'
                    )->ignore(
                        $user->id
                    ),
                ],

                'role' => [
                    'required',
                ],
            ]);

        $user->update([
            'name' =>
            $validated['name'],

            'email' =>
            $validated['email'],
        ]);

        $user->syncRoles([
            $validated['role'],
        ]);

        return redirect()
            ->route('users.index')
            ->with(
                'success',
                'User berhasil diperbarui.'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        User $user
    ) {
        if (
            $user->hasRole(
                'super-admin'
            )
        ) {
            return back()->with(
                'error',
                'Super Admin tidak dapat dihapus.'
            );
        }

        $user->delete();

        return back()->with(
            'success',
            'User berhasil dihapus.'
        );
    }
}
