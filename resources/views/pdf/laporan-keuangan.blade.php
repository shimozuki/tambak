<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">

    <style>
        body {
            font-family: sans-serif;
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
    </style>
</head>

<body>

    <h2>
        Laporan Keuangan Tambak Udang
    </h2>

    <p>
        Periode :
        {{ $tanggalAwal }}
        -
        {{ $tanggalAkhir }}
    </p>

    <hr>

    <h3>Ringkasan</h3>

    <table>
        <tr>
            <th>Total Pemasukan</th>
            <th>Total Pengeluaran</th>
            <th>Laba Bersih</th>
        </tr>

        <tr>
            <td>
                Rp
                {{ number_format($totalPemasukan,0,',','.') }}
            </td>

            <td>
                Rp
                {{ number_format($totalPengeluaran,0,',','.') }}
            </td>

            <td>
                Rp
                {{ number_format($labaBersih,0,',','.') }}
            </td>
        </tr>
    </table>

    <br>

    <h3>Data Pemasukan</h3>

    <table>
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Kolam</th>
                <th>Total</th>
            </tr>
        </thead>

        <tbody>
            @foreach($pemasukan as $item)
            <tr>
                <td>
                    {{ $item->tanggal_panen }}
                </td>

                <td>
                    {{ $item->kolam->nama_kolam }}
                </td>

                <td>
                    Rp
                    {{ number_format($item->total_pemasukan,0,',','.') }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <br>

    <h3>Data Pengeluaran</h3>

    <table>
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Jumlah</th>
            </tr>
        </thead>

        <tbody>
            @foreach($pengeluaran as $item)
            <tr>
                <td>
                    {{ $item->tanggal }}
                </td>

                <td>
                    {{ $item->kategori->nama_kategori }}
                </td>

                <td>
                    Rp
                    {{ number_format($item->jumlah,0,',','.') }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>