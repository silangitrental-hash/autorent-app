

import { Home, Star, Pin, FileText, ArrowLeft } from 'lucide-react';

const id = {
    loading: "Memuat",
    navLinks: [
      { href: "/", label: "Home", icon: Home },
      { href: "/testimoni", label: "Testimoni", icon: Star },
      { href: "/kontak", label: "Alamat", icon: Pin },
      { href: "/syarat-ketentuan", label: "S&K", icon: FileText },
    ],
    footer: {
      description: "Solusi rental mobil terbaik dengan layanan profesional dan armada terawat.",
      navigation: "Navigasi",
      contactUs: "Hubungi Kami",
      copyright: (year: number) => `© ${year} AutoRent. Hak cipta dilindungi undang-undang.`,
      navLinks: [
        { href: "/", label: "Home" },
        { href: "/testimoni", label: "Testimoni" },
        { href: "/kontak", label: "Kontak & Alamat" },
        { href: "/syarat-ketentuan", label: "S&K" },
      ],
    },
    home: {
      hero: {
        title: (brand: string, name: string) => `Promo Spesial ${brand} ${name}`,
        description: "Dapatkan diskon 25% untuk perjalanan akhir pekan Anda!",
        bookNow: "Pesan Sekarang",
      },
      fleet: {
        title: "Armada Kami",
        searchPlaceholder: "Cari mobil...",
        filterAndSort: "Filter & Sortir",
        filterDescription: "Sesuaikan pencarian mobil Anda.",
        filters: {
          brand: {
            title: "Brand",
            placeholder: "Tampilkan semua brand",
            all: "Semua Brand",
          },
          type: {
            title: "Tipe Mobil",
            placeholder: "Tampilkan semua tipe",
            all: "Semua Tipe",
          },
        },
        sort: {
          title: "Sortir",
          priceAsc: "Harga Terendah",
          priceDesc: "Harga Tertinggi",
          ratingDesc: "Rating Tertinggi",
        },
        reset: "Reset",
        showResults: "Tampilkan Hasil",
        showMore: "Tampilkan Lebih Banyak",
      },
    },
    vehicleCard: {
        priceStartFrom: "Mulai dari",
        day: "hari",
        book: "Pesan",
        tooltip: "Tekan untuk detail",
    },
    orderForm: {
        title: "Form Pemesanan",
        tabs: {
            direct: {
                title: "Pesan Langsung",
                duration: "Durasi Sewa (hari)",
            },
            reservation: {
                title: "Reservasi",
                startDate: "Mulai dari",
                endDate: "Sampai dengan",
                selectDate: "Pilih tanggal",
            }
        },
        common: {
            transmission: {
                label: "Transmisi",
            },
            service: {
                label: "Layanan",
                placeholder: "Pilih layanan",
                options: {
                    selfDrive: "Lepas Kunci",
                    withDriver: "Dengan Supir",
                }
            }
        },
        summary: {
            title: "Rincian Pesanan",
            basePrice: "Harga Sewa",
            driverFee: "Biaya Supir",
            maticFee: "Biaya Transmisi Matic",
            duration: "Durasi",
            days: "hari",
            total: "Total",
        },
        bookNow: "Pesan Sekarang",
    },
    payment: {
        title: "Checkout & Pembayaran",
        description: "Selesaikan pesanan Anda dalam beberapa langkah mudah.",
        days: "hari",
        personalData: {
            title: "Data Diri Anda",
            fullName: "Nama Lengkap",
            fullNamePlaceholder: "Masukkan nama lengkap Anda",
            phone: "Nomor Telepon (WhatsApp)",
            phonePlaceholder: "cth. 081234567890",
        },
        orderSummary: {
            title: "Ringkasan Pesanan",
            rentalPeriod: "Periode Sewa",
            rentalPrice: (days: number) => `Harga Sewa (${days} hari)`,
            driverFee: (days: number) => `Biaya Supir (${days} hari)`,
            maticFee: "Biaya Transmisi Matic",
            totalPayment: "Total Pembayaran",
        },
        paymentMethod: {
            title: "Pilih Metode Pembayaran",
            bank: {
                title: "Transfer Bank",
                description: "Bayar ke rekening BCA atau Mandiri kami. DP 50% diperlukan.",
            },
            qris: {
                title: "QRIS",
                description: "Scan kode QR untuk pembayaran instan. Pembayaran penuh.",
            },
        },
        confirmAndPay: "Konfirmasi & Bayar",
        attention: {
            title: "Perhatian!",
            description: "Tim kami akan menghubungi Anda melalui WhatsApp untuk verifikasi setelah pembayaran dikonfirmasi.",
        },
        validation: {
            title: "Formulir Tidak Lengkap",
            description: "Mohon isi nama lengkap dan nomor telepon sebelum melanjutkan.",
        }
    },
    confirmation: {
        title: "Terima Kasih!",
        description: "Pesanan Anda telah kami terima.",
        orderNumber: "Nomor Pesanan",
        status: "Status",
        statusAwaitingPayment: "Menunggu Pembayaran",
        vehicle: "Kendaraan",
        rentalPeriod: "Periode Sewa",
        service: "Layanan",
        totalPayment: "Total Pembayaran",
        invalidPeriod: "Periode tidak valid",
        days: "hari",
        copy: "Salin",
        copied: "Tersalin!",
        paymentInstructions: {
            bank: {
                title: "Instruksi Pembayaran",
                description: "Silakan lakukan pembayaran ke salah satu rekening di bawah ini.",
                selectBank: "Pilih Bank Tujuan",
            },
            qris: {
                title: "Instruksi Pembayaran QRIS",
                description: "Silakan pindai kode QR di bawah ini menggunakan aplikasi perbankan atau e-wallet Anda.",
                important: {
                    title: "Penting!",
                    description: "Pastikan nominal yang Anda masukkan sesuai dengan total tagihan.",
                }
            }
        },
        upload: {
            title: "Unggah Bukti Pembayaran",
            description: "Setelah melakukan pembayaran, silakan unggah bukti transfer atau screenshot di sini.",
            success: {
                title: "Upload Berhasil!",
                description: "Terima kasih! Tim kami akan segera melakukan verifikasi.",
                contactAdmin: "Hubungi Admin",
            },
            error: {
                title: "Upload Gagal",
            },
            selectFile: "Klik untuk memilih file",
            fileHint: "PNG, JPG, JPEG (maks. 5MB)",
            preview: "Pratinjau:",
            uploading: "Mengunggah...",
            submit: "Kirim Bukti Pembayaran",
        },
        error: {
            title: "Data Pesanan Tidak Lengkap",
            description: "Informasi pesanan tidak lengkap atau tidak valid. Silakan kembali ke halaman utama dan ulangi proses pemesanan.",
            backButton: "Kembali ke Halaman Utama",
        },
    },
    testimonials: {
        title: "Testimoni Pelanggan",
        description: "Lihat apa kata mereka tentang layanan kami.",
        tabs: {
            reviews: "Ulasan Pelanggan",
            gallery: "Galeri Foto",
        },
        rented: "Menyewa",
        galleryAlt: "Galeri pelanggan AutoRent",
        galleryHover: "Momen bersama AutoRent",
    },
    contact: {
        title: "Hubungi & Kunjungi Kami",
        description: "Kami siap membantu Anda 24/7. Kantor kami buka setiap hari, pukul 08:00 - 22:00 WITA.",
        mapTitle: "Peta Lokasi AutoRent",
        getDirections: "Arah",
        contactWhatsApp: "WhatsApp",
        officeAddress: "Alamat Kantor",
        email: "Email",
        whatsApp: "WhatsApp",
    },
    terms: {
        title: "Syarat & Ketentuan",
        description: "Harap baca dengan saksama syarat dan ketentuan sewa mobil kami sebelum melakukan pemesanan.",
        general: {
            title: "Persyaratan Umum",
        },
        payment: {
            title: "Metode Pembayaran",
            description: "Kami menerima metode pembayaran berikut:",
            downPayment: "DP (Down Payment) sebesar 50% wajib dibayarkan saat melakukan reservasi, dan pelunasan dilakukan saat pengambilan kendaraan.",
        }
    },
    vehicleDetail: {
        pricePerDay: "Harga sewa per hari",
        bookNow: "Pesan Sekarang",
        details: {
            title: "Detail Kendaraan",
            brand: "Brand",
            type: "Tipe",
            transmission: "Transmisi",
            fuel: "Bahan Bakar",
            capacity: "Kapasitas",
            passenger: "Penumpang",
            year: "Tahun",
        },
        reviews: {
            customerReviews: "Ulasan Pelanggan",
            noReviews: "Belum ada ulasan untuk mobil ini.",
            writeReview: "Tulis Ulasan Anda",
            shareExperience: "Bagikan pengalaman Anda",
            formDescription: "Bagaimana pengalaman Anda dengan mobil dan layanan kami?",
            commentPlaceholder: "Tulis komentar Anda di sini...",
            yourRating: "Rating Anda:",
            submitReview: "Kirim Ulasan",
        },
        otherRecommendations: "Rekomendasi Mobil Lain",
    },
    starRating: {
        reviews: "ulasan",
    },
    backToHome: "Kembali ke Home"
};

const en: typeof id = {
    loading: "Loading",
    navLinks: [
      { href: "/", label: "Home", icon: Home },
      { href: "/testimoni", label: "Testimonials", icon: Star },
      { href: "/kontak", label: "Address", icon: Pin },
      { href: "/syarat-ketentuan", label: "T&C", icon: FileText },
    ],
    footer: {
      description: "The best car rental solution with professional service and well-maintained fleet.",
      navigation: "Navigation",
      contactUs: "Contact Us",
      copyright: (year: number) => `© ${year} AutoRent. All rights reserved.`,
      navLinks: [
        { href: "/", label: "Home" },
        { href: "/testimoni", label: "Testimonials" },
        { href: "/kontak", label: "Contact & Address" },
        { href: "/syarat-ketentuan", label: "T&C" },
      ],
    },
    home: {
      hero: {
        title: (brand: string, name: string) => `Special Promo for ${brand} ${name}`,
        description: "Get a 25% discount for your weekend trip!",
        bookNow: "Book Now",
      },
      fleet: {
        title: "Our Fleet",
        searchPlaceholder: "Search for a car...",
        filterAndSort: "Filter & Sort",
        filterDescription: "Customize your car search.",
        filters: {
          brand: {
            title: "Brand",
            placeholder: "Show all brands",
            all: "All Brands",
          },
          type: {
            title: "Car Type",
            placeholder: "Show all types",
            all: "All Types",
          },
        },
        sort: {
          title: "Sort by",
          priceAsc: "Lowest Price",
          priceDesc: "Highest Price",
          ratingDesc: "Highest Rating",
        },
        reset: "Reset",
        showResults: "Show Results",
        showMore: "Show More",
      },
    },
    vehicleCard: {
        priceStartFrom: "Starts from",
        day: "day",
        book: "Book",
        tooltip: "Click for details",
    },
    orderForm: {
        title: "Booking Form",
        tabs: {
            direct: {
                title: "Direct Booking",
                duration: "Rental Duration (days)",
            },
            reservation: {
                title: "Reservation",
                startDate: "Start from",
                endDate: "Until",
                selectDate: "Select date",
            }
        },
        common: {
            transmission: {
                label: "Transmission",
            },
            service: {
                label: "Service",
                placeholder: "Select service",
                options: {
                    selfDrive: "Self Drive",
                    withDriver: "With Driver",
                }
            }
        },
        summary: {
            title: "Order Details",
            basePrice: "Rental Price",
            driverFee: "Driver Fee",
            maticFee: "Matic Transmission Fee",
            duration: "Duration",
            days: "days",
            total: "Total",
        },
        bookNow: "Book Now",
    },
     payment: {
        title: "Checkout & Payment",
        description: "Complete your order in a few easy steps.",
        days: "days",
        personalData: {
            title: "Your Personal Data",
            fullName: "Full Name",
            fullNamePlaceholder: "Enter your full name",
            phone: "Phone Number (WhatsApp)",
            phonePlaceholder: "e.g. 081234567890",
        },
        orderSummary: {
            title: "Order Summary",
            rentalPeriod: "Rental Period",
            rentalPrice: (days: number) => `Rental Price (${days} days)`,
            driverFee: (days: number) => `Driver Fee (${days} days)`,
            maticFee: "Matic Transmission Fee",
            totalPayment: "Total Payment",
        },
        paymentMethod: {
            title: "Select Payment Method",
            bank: {
                title: "Bank Transfer",
                description: "Pay to our BCA or Mandiri account. 50% DP required.",
            },
            qris: {
                title: "QRIS",
                description: "Scan the QR code for instant payment. Full payment required.",
            },
        },
        confirmAndPay: "Confirm & Pay",
        attention: {
            title: "Attention!",
            description: "Our team will contact you via WhatsApp for verification after payment is confirmed.",
        },
        validation: {
            title: "Incomplete Form",
            description: "Please fill in your full name and phone number before proceeding.",
        }
    },
    confirmation: {
        title: "Thank You!",
        description: "Your order has been received.",
        orderNumber: "Order Number",
        status: "Status",
        statusAwaitingPayment: "Awaiting Payment",
        vehicle: "Vehicle",
        rentalPeriod: "Rental Period",
        service: "Service",
        totalPayment: "Total Payment",
        invalidPeriod: "Invalid period",
        days: "days",
        copy: "Copy",
        copied: "Copied!",
        paymentInstructions: {
            bank: {
                title: "Payment Instructions",
                description: "Please make the payment to one of the bank accounts below.",
                selectBank: "Select Destination Bank",
            },
            qris: {
                title: "QRIS Payment Instructions",
                description: "Please scan the QR code below using your banking or e-wallet application.",
                important: {
                    title: "Important!",
                    description: "Please ensure the amount you enter matches the total bill.",
                }
            }
        },
        upload: {
            title: "Upload Payment Proof",
            description: "After making the payment, please upload the transfer proof or screenshot here.",
            success: {
                title: "Upload Successful!",
                description: "Thank you! Our team will verify it shortly.",
                contactAdmin: "Contact Admin",
            },
            error: {
                title: "Upload Failed",
            },
            selectFile: "Click to select a file",
            fileHint: "PNG, JPG, JPEG (max. 5MB)",
            preview: "Preview:",
            uploading: "Uploading...",
            submit: "Submit Payment Proof",
        },
        error: {
            title: "Incomplete Order Data",
            description: "Order information is incomplete or invalid. Please return to the main page and repeat the booking process.",
            backButton: "Back to Home",
        },
    },
    testimonials: {
        title: "Customer Testimonials",
        description: "See what they say about our service.",
        tabs: {
            reviews: "Customer Reviews",
            gallery: "Photo Gallery",
        },
        rented: "Rented",
        galleryAlt: "AutoRent customer gallery",
        galleryHover: "Moments with AutoRent",
    },
    contact: {
        title: "Contact & Visit Us",
        description: "We are ready to help you 24/7. Our office is open daily, from 08:00 - 22:00 WITA.",
        mapTitle: "AutoRent Location Map",
        getDirections: "Directions",
        contactWhatsApp: "WhatsApp",
        officeAddress: "Office Address",
        email: "Email",
        whatsApp: "WhatsApp",
    },
    terms: {
        title: "Terms & Conditions",
        description: "Please read our car rental terms and conditions carefully before making a booking.",
        general: {
            title: "General Requirements",
        },
        payment: {
            title: "Payment Methods",
            description: "We accept the following payment methods:",
            downPayment: "A 50% Down Payment (DP) is required upon reservation, and the balance is paid upon vehicle pickup.",
        }
    },
    vehicleDetail: {
        pricePerDay: "Rental price per day",
        bookNow: "Book Now",
        details: {
            title: "Vehicle Details",
            brand: "Brand",
            type: "Type",
            transmission: "Transmission",
            fuel: "Fuel",
            capacity: "Capacity",
            passenger: "Passengers",
            year: "Year",
        },
        reviews: {
            customerReviews: "Customer Reviews",
            noReviews: "No reviews for this car yet.",
            writeReview: "Write Your Review",
            shareExperience: "Share your experience",
            formDescription: "How was your experience with our car and service?",
            commentPlaceholder: "Write your comment here...",
            yourRating: "Your Rating:",
            submitReview: "Submit Review",
        },
        otherRecommendations: "Other Car Recommendations",
    },
    starRating: {
        reviews: "reviews",
    },
    backToHome: "Back to Home"
};

export const dictionaries = { id, en };
export type Language = keyof typeof dictionaries;
