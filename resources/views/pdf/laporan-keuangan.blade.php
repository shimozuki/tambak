<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">

    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }

        h2,
        h3 {
            margin-bottom: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        th {
            background: #0D9488;
            color: white;
        }

        .text-right {
            text-align: right;
        }

        .summary {
            margin-bottom: 20px;
        }
    </style>
</head>

<body>

    <h2>
        Laporan Keuangan Tambak Udang
    </h2>

    <p>
        Periode :
        {{ $tanggalAwal ?: '-' }}
        -
        {{ $tanggalAkhir ?: '-' }}
    </p>

    <hr>

    {{-- Ringkasan --}}
    <h3>Ringkasan</h3>

    <table class="summary">
        <tr>
            <th>Total Pemasukan</th>
            <th>Total Pengeluaran</th>
            <th>Laba Bersih</th>
        </tr>

        <tr>
            <td class="text-right">
                Rp {{ number_format($totalPemasukan, 0, ',', '.') }}
            </td>

            <td class="text-right">
                Rp {{ number_format($totalPengeluaran, 0, ',', '.') }}
            </td>

            <td class="text-right">
                Rp {{ number_format($labaBersih, 0, ',', '.') }}
            </td>
        </tr>
    </table>

    {{-- Penjualan --}}
    <h3>Data Penjualan</h3>

    <table>
        <thead>
            <tr>
                <th width="25%">Tanggal</th>
                <th>Keterangan</th>
                <th width="25%">Jumlah</th>
            </tr>
        </thead>

        <tbody>

            @forelse($pemasukan as $item)
            <tr>

                <td>
                    {{ \Carbon\Carbon::parse($item->tanggal_penjualan)->format('d-m-Y') }}
                </td>

                <td>
                    {{ $item->keterangan ?? '-' }}
                </td>

                <td class="text-right">
                    Rp {{ number_format($item->jumlah_penjualan, 0, ',', '.') }}
                </td>

            </tr>
            @empty
            <tr>
                <td colspan="3" style="text-align:center">
                    Tidak ada data penjualan
                </td>
            </tr>
            @endforelse

        </tbody>
    </table>

    <br>

    {{-- Pengeluaran --}}
    <h3>Data Pengeluaran</h3>

    <table>
        <thead>
            <tr>
                <th width="20%">Tanggal</th>
                <th>Kategori</th>
                <th>Keterangan</th>
                <th width="20%">Jumlah</th>
            </tr>
        </thead>

        <tbody>

            @forelse($pengeluaran as $item)

            <tr>

                <td>
                    {{ \Carbon\Carbon::parse($item->tanggal)->format('d-m-Y') }}
                </td>

                <td>
                    {{ $item->kategori->nama_kategori }}
                </td>

                <td>
                    {{ $item->keterangan ?? '-' }}
                </td>

                <td class="text-right">
                    Rp {{ number_format($item->jumlah, 0, ',', '.') }}
                </td>

            </tr>

            @empty

            <tr>
                <td colspan="4" style="text-align:center">
                    Tidak ada data pengeluaran
                </td>
            </tr>

            @endforelse

        </tbody>
    </table>

</body>

</html>