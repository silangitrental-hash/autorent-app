'use client';

import { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Order, Vehicle, BankAccount } from "@/lib/types";
import { Download, FileText, Trash2, University, Upload } from "lucide-react";
import Image from "next/image";
import { Combobox } from '@/components/ui/combobox';
import { bankList } from '@/lib/bank-data';
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { ComboboxItem } from '@/components/ui/combobox';

// Helper function to calculate total cost based on order details
// In a real app, this logic might live on the backend or be more complex
const calculateTotal = (order: Order, fleet: Vehicle[]) => {
  const vehicle = fleet.find(v => v.name === order.carName);
  if (!vehicle) return 0;

  const SERVICE_COSTS = { driver: 150000, matic: 50000 };
  const days = 1; // Assuming 1 day for simulation

  const rentalCost = vehicle.price * days;
  const mFee = vehicle.transmission === 'Matic' ? SERVICE_COSTS.matic * days : 0;
  const dFee = order.service === 'Dengan Supir' ? SERVICE_COSTS.driver * days : 0;
  const subtotal = rentalCost + mFee + dFee;
  const discAmount = vehicle.discountPercentage ? (rentalCost * vehicle.discountPercentage) / 100 : 0;
  
  return subtotal - discAmount;
};


export default function KeuanganPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [fleet, setFleet] = useState<Vehicle[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  const formatCurrency = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);
  const [isQrisUploadOpen, setQrisUploadOpen] = useState(false);
  const { toast } = useToast();
  const [isPricesOpen, setIsPricesOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Dummy data to simulate existing QRIS
  const [activeQrisUrl, setActiveQrisUrl] = useState<string | null>("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example");

  const financialReport = orders.map((order, index) => ({
    no: index + 1,
    orderNo: order.id,
    unit: order.carName,
    service: order.service,
    transmission: order.transmission,
    payment: order.paymentMethod,
    driver: order.driver || "-",
    total: calculateTotal(order, fleet),
    status: order.status
  }));

  const handleDownloadXLSX = async () => {
    if (financialReport.length === 0) {
        toast({
            variant: "destructive",
            title: "Tidak Ada Data",
            description: "Laporan tidak dapat diunduh karena tidak ada data keuangan.",
        });
        return;
    }
    const ExcelJS = await import('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Laporan Keuangan");

    worksheet.columns = [
      { header: 'No.', key: 'no', width: 5 },
      { header: 'No. Order', key: 'orderNo', width: 15 },
      { header: 'Unit Disewa', key: 'unit', width: 20 },
      { header: 'Layanan', key: 'service', width: 15 },
      { header: 'Transmisi', key: 'transmission', width: 15 },
      { header: 'Jenis Pembayaran', key: 'payment', width: 20 },
      { header: 'Driver', key: 'driver', width: 10 },
      { header: 'Total Pemasukan', key: 'total', width: 20 },
      { header: 'Status', key: 'status', width: 10 }
    ];

    const reportData = financialReport.map(item => ({
        ...item,
        total: item.total, // ExcelJS handles numbers correctly
        status: item.status === 'disetujui' ? 'Lunas' : item.status
    }));

    worksheet.addRows(reportData);

    const date = new Date();
    const month = date.toLocaleString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    const fileName = `laporan_keuangan_${month.toLowerCase()}_${year}.xlsx`;

    // Create a blob and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
        title: "Laporan Diunduh",
        description: `File ${fileName} berhasil dibuat.`
    });
  };

  const handleSavePrices = () => {
    toast({
        title: "Harga Disimpan",
        description: "Harga layanan telah berhasil diperbarui."
    });
    setIsPricesOpen(false);
  };

  const handleAddAccount = () => {
     toast({
        title: "Rekening Ditambahkan",
        description: "Rekening bank baru telah disimpan."
    });
  };
  
  const handleDeleteAccount = (account: BankAccount) => {
      toast({
        variant: "destructive",
        title: "Rekening Dihapus",
        description: `Rekening ${account.bankName} (${account.accountNumber}) telah dihapus.`
    });
  }
  
   const handleQrisSave = () => {
      toast({
        title: "QRIS Diperbarui",
        description: `Kode QRIS baru telah berhasil disimpan dan diaktifkan.`
    })
    if (previewUrl) {
      setActiveQrisUrl(previewUrl);
      setPreviewUrl(null);
    }
    setQrisUploadOpen(false)
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleQrisDelete = () => {
    setActiveQrisUrl(null);
    toast({
      variant: "destructive",
      title: "QRIS Dihapus",
      description: "Pembayaran QRIS telah dinonaktifkan."
    });
  }


  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keuangan</h1>
          <p className="text-muted-foreground">
            Kelola harga, metode pembayaran, dan laporan keuangan.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Dialog open={isPricesOpen} onOpenChange={setIsPricesOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Harga Layanan</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Pengaturan Harga Layanan</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="matic-price" className="text-right col-span-2">Harga Transmisi Matic</Label>
                            <Input id="matic-price" type="number" defaultValue="50000" className="col-span-2" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="driver-price" className="text-right col-span-2">Harga Dengan Supir</Label>
                            <Input id="driver-price" type="number" defaultValue="100000" className="col-span-2" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSavePrices}>Simpan Harga</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isPaymentsOpen} onOpenChange={setIsPaymentsOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full">Jenis Pembayaran</Button>
                </DialogTrigger>
                 <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Pengaturan Jenis Pembayaran</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="bank">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="bank">Transfer Bank</TabsTrigger>
                            <TabsTrigger value="qris">QRIS</TabsTrigger>
                        </TabsList>
                        <TabsContent value="bank" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tambah Rekening</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Combobox
                                            items={bankList as ComboboxItem[]}
                                            searchPlaceholder="Cari bank..."
                                            placeholder="Pilih Bank"
                                            notfoundText="Bank tidak ditemukan."
                                        />
                                        <Input placeholder="Nomor Rekening" />
                                        <Input placeholder="Atas Nama" />
                                    </div>
                                    <Button onClick={handleAddAccount}>Tambah Rekening</Button>
                                    <div className="space-y-4 pt-6">
                                        <h4 className="font-medium text-lg">Daftar Rekening</h4>
                                        {bankAccounts.length > 0 ? bankAccounts.map(acc => (
                                            <div key={acc.accountNumber} className="rounded-md border p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                <University className="h-6 w-6 text-muted-foreground" />
                                                <div>
                                                        <p className="font-semibold text-base">{acc.bankName} - {acc.accountNumber}</p>
                                                        <p className="text-sm text-muted-foreground">a.n. {acc.accountName}</p>
                                                </div>
                                                </div>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Anda Yakin?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Tindakan ini akan menghapus rekening {acc.bankName} a.n. {acc.accountName} secara permanen.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteAccount(acc)} className="bg-destructive hover:bg-destructive/90">Ya, Hapus</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        )) : (
                                             <p className="text-sm text-muted-foreground text-center py-4">Belum ada rekening bank yang ditambahkan.</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="qris" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Kelola Kode QRIS</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <Dialog open={isQrisUploadOpen} onOpenChange={setQrisUploadOpen}>
                                        <DialogTrigger asChild>
                                             <Button variant="outline">Upload Kode QR Baru</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Upload Kode QRIS</DialogTitle>
                                            </DialogHeader>
                                            <div className="py-4 space-y-4">
                                                 {previewUrl && (
                                                    <div className="relative aspect-square w-full max-w-sm mx-auto rounded-md overflow-hidden border">
                                                        <Image
                                                            src={previewUrl}
                                                            alt="Pratinjau QRIS"
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                )}
                                                <Label htmlFor="qris-upload" className={cn("w-full cursor-pointer", "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", "border border-input bg-background hover:bg-accent hover:text-accent-foreground", "h-10 px-4 py-2")}>
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    {previewUrl ? 'Ganti File...' : 'Pilih File Gambar QRIS...'}
                                                </Label>
                                                <Input id="qris-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setQrisUploadOpen(false)}>Batal</Button>
                                                <Button onClick={handleQrisSave} disabled={!previewUrl}>Upload & Simpan</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                     </Dialog>
                                    
                                    <div className="space-y-4 pt-6">
                                        <h4 className="font-medium text-lg">QRIS Aktif</h4>
                                        {activeQrisUrl ? (
                                        <div className="relative w-48 h-48 border rounded-md p-2">
                                            <Image src={activeQrisUrl} alt="QRIS Code" fill className="object-contain" data-ai-hint="qr code"/>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="icon" className="absolute -top-3 -right-3 h-8 w-8 rounded-full"><Trash2 className="h-4 w-4"/></Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Hapus QRIS Aktif?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan ini akan menonaktifkan pembayaran melalui QRIS hingga Anda mengunggah kode yang baru.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleQrisDelete} className="bg-destructive hover:bg-destructive/90">Ya, Hapus</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                        ) : (
                                        <div className="text-center text-muted-foreground p-8 border rounded-md">
                                          Belum ada QRIS yang aktif. Silakan unggah kode QR baru.
                                        </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
      </div>

       <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <CardTitle>Laporan Keuangan</CardTitle>
                <CardDescription>Ringkasan transaksi berdasarkan data order.</CardDescription>
            </div>
            <Button variant="outline" className="w-full md:w-auto" onClick={handleDownloadXLSX} disabled={financialReport.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Download Laporan (XLSX)
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>No. Order</TableHead>
                <TableHead>Unit Disewa</TableHead>
                <TableHead>Layanan</TableHead>
                <TableHead>Transmisi</TableHead>
                <TableHead>Jenis Pembayaran</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead className="text-right">Total Pemasukan</TableHead>
                <TableHead className="text-center">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financialReport.length > 0 ? (
                financialReport.map((item) => (
                    <TableRow key={item.no}>
                    <TableCell>{item.no}</TableCell>
                    <TableCell>{item.orderNo}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.service}</TableCell>
                    <TableCell>{item.transmission}</TableCell>
                    <TableCell>{item.payment}</TableCell>
                    <TableCell>{item.driver}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(item.total)}</TableCell>
                    <TableCell className="text-center">
                        <Button variant="outline" size="sm" asChild disabled={item.status !== 'disetujui'}>
                        <Link href={`/invoice/${item.orderNo}`} target="_blank">
                            <FileText className="h-4 w-4" />
                        </Link>
                        </Button>
                    </TableCell>
                    </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                        Belum ada data keuangan.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}