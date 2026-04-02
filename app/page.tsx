"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Plus, Minus, ShoppingCart, User, CheckCircle2, ChevronRight, Loader2, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type FoodItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  item_image?: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
};

// --- Constants & Data ---
const API_ENDPOINT = "https://sheetdb.io/api/v1/ufatsq1zsf1kg";

const CATEGORIES: Category[] = [
  { id: "snacks", name: "Đồ Ăn Vặt", icon: "🍿" },
  { id: "banhmi", name: "Bánh Mì", icon: "🥖" },
  { id: "mitom", name: "Mì Tôm", icon: "🍜" },
  { id: "com", name: "Các Món Cơm", icon: "🍚" },
];

const MENU: FoodItem[] = [
  // Snacks
  { id: "v1", name: "Xúc xích", price: 10000, category: "snacks", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "v2", name: "Lạp xưởng", price: 15000, category: "snacks", image: "https://images.unsplash.com/photo-1593001874117-c99c800bc3b7?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "v3", name: "Khoai lang kén", price: 30000, category: "snacks", image: "https://images.unsplash.com/photo-1563714193019-219904791522?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "v4", name: "Khoai tây chiên", price: 30000, category: "snacks", image: "https://images.unsplash.com/photo-1573082833947-d7994d728e4c?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "v5", name: "Nem chua rán", price: 30000, category: "snacks", image: "https://user-images.githubusercontent.com/10141908/160243306-6f8e7b9e-6b9e-4b9e-8b9e-6b9e4b9e8b9e.jpg" },

  // Bánh Mì
  { id: "b1", name: "Trứng ốp ăn thêm", price: 7000, category: "banhmi", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "b2", name: "Chả ăn thêm", price: 10000, category: "banhmi", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "b3", name: "Bánh mì xúc xích", price: 20000, category: "banhmi", image: "https://images.unsplash.com/photo-1509722747041-619f3830422d?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "b4", name: "Bánh mì chả", price: 20000, category: "banhmi", image: "https://images.unsplash.com/photo-1509722747041-619f3830422d?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "b5", name: "Bánh mì trứng", price: 20000, category: "banhmi", image: "https://images.unsplash.com/photo-1509722747041-619f3830422d?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "b6", name: "Bánh mì trứng chả", price: 25000, category: "banhmi", image: "https://images.unsplash.com/photo-1509722747041-619f3830422d?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "b7", name: "Bánh mì trứng xúc xích", price: 30000, category: "banhmi", image: "https://images.unsplash.com/photo-1509722747041-619f3830422d?q=80&w=300&h=200&auto=format&fit=crop" },

  // Mì Tôm
  { id: "m1", name: "Trứng ốp ăn thêm", price: 7000, category: "mitom", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "m2", name: "Mỳ hảo hảo ăn thêm", price: 7000, category: "mitom", image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "m3", name: "Kim chi ăn thêm", price: 10000, category: "mitom", image: "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "m4", name: "Xúc xích ăn thêm", price: 10000, category: "mitom", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "m5", name: "1 gói mì Indomie ăn thêm", price: 10000, category: "mitom", image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "m6", name: "Mì trứng rau cải", price: 25000, category: "mitom", image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "m7", name: "Mì trứng xúc xích", price: 30000, category: "mitom", image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "m8", name: "Mì bò áp chảo", price: 40000, category: "mitom", image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "m9", name: "Mì trộn Indomie", price: 40000, category: "mitom", image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "m10", name: "Mì xào bò", price: 45000, category: "mitom", image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=300&h=200&auto=format&fit=crop" },

  // Cơm
  { id: "c1", name: "Chuyển thành cơm rang", price: 5000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c2", name: "Cơm ăn thêm", price: 5000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c3", name: "Canh chua thịt băm", price: 10000, category: "com", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c4", name: "Chả thêm", price: 10000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c5", name: "Kim chi thêm", price: 10000, category: "com", image: "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c6", name: "Xúc xích", price: 10000, category: "com", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c7", name: "Chả lá lốt thêm", price: 20000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c8", name: "Trứng đúc thịt thêm", price: 25000, category: "com", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c9", name: "Trứng sốt cà chua thêm", price: 25000, category: "com", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c10", name: "Gà xào nấm thêm", price: 30000, category: "com", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c11", name: "Thịt ba chỉ quay thêm", price: 30000, category: "com", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c12", name: "Cơm trứng sốt cà chua", price: 35000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c13", name: "Cơm trứng đúc thịt", price: 40000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c14", name: "Cơm ba chỉ rang cháy cạnh", price: 45000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c15", name: "Cơm bò sốt tiêu đen", price: 45000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c16", name: "Cơm chả lá lốt", price: 45000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c17", name: "Cơm gà sốt tiêu đen", price: 45000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c18", name: "Cơm gà xào nấm", price: 45000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c19", name: "Cơm đùi gà xối mỡ", price: 55000, category: "com", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c20", name: "Cơm đùi gà sốt chua ngọt", price: 55000, category: "com", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c21", name: "Cơm rang bò kim chi", price: 45000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c22", name: "Cơm rang gà kim chi", price: 45000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c23", name: "Cơm rang dưa bò", price: 45000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c24", name: "Cơm rang gà chiên", price: 45000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c25", name: "Cơm rang thịt băm", price: 45000, category: "com", image: "https://images.unsplash.com/photo-1603133872878-684f208fb04b?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: "c26", name: "Cơm ba chỉ quay", price: 50000, category: "com", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&h=200&auto=format&fit=crop" },
];

export default function OrderPage() {
  const [userName, setUserName] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("snacks");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const cartItems = useMemo(() => {
    return MENU.filter((item) => quantities[item.id] > 0).map((item) => ({
      ...item,
      quantity: quantities[item.id],
    }));
  }, [quantities]);

  const filteredMenu = useMemo(() => {
    if (!searchQuery.trim()) return MENU;
    return MENU.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = categoryRefs.current[id];
    if (element) {
      const headerOffset = 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      CATEGORIES.forEach((cat) => {
        const element = categoryRefs.current[cat.id];
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const absoluteTop = top + window.pageYOffset;
          const absoluteBottom = bottom + window.pageYOffset;
          if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
            setActiveCategory(cat.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError("Vui lòng nhập họ và tên!");
      return;
    }
    if (cartItems.length === 0) {
      setError("Giỏ hàng của bạn đang trống!");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const orderData = {
      customer_name: userName,
      items: cartItems.map(item => `${item.name} (x${item.quantity})`).join(", "),
      total_price: totalPrice,
      timestamp: new Date().toLocaleString("vi-VN"),
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok || API_ENDPOINT.includes("YOUR_API_ID")) {
        setIsSuccess(true);
        setIsCartOpen(false);
        setQuantities({});
        setUserName("");
      } else {
        throw new Error("Failed");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại sau!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EDEEE9] p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-[2rem] shadow-2xl text-center max-w-md w-full border border-gray-100">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-[#002C5F] mb-4">Đặt món thành công!</h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed">Cảm ơn bạn. Đơn hàng đã được ghi nhận và đang được xử lý.</p>
          <button onClick={() => setIsSuccess(false)} className="w-full bg-[#002C5F] hover:bg-[#003d82] text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/10">
            Quay lại thực đơn
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDEEE9] text-[#002C5F] font-sans selection:bg-orange-100 relative">
      {/* Top Header */}
      <header className="bg-white sticky top-0 z-[50] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-blue-900/10 border border-gray-100">
                <img src="/icon.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black tracking-tighter leading-none">ISpectra Food</h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Delivery Service</p>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Tìm món ăn yêu thích..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/50 outline-none placeholder:text-gray-300 font-medium transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex flex-col items-end hidden mr-2 text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Hỗ trợ</span>
                <span className="text-sm font-black">He he he</span>
              </div>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer outline-none"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-in fade-in zoom-in">{cartItems.length}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Category Scrollbar */}
        {!searchQuery && (
          <div className="border-t border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 whitespace-nowrap py-4 h-16 items-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-full border-2 ${activeCategory === cat.id
                    ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-200 scale-105"
                    : "text-gray-400 border-transparent hover:text-[#002C5F] hover:bg-gray-50 hover:border-gray-200"
                    }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search View UI */}
        {searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setSearchQuery("")} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-black italic">Kết quả tìm kiếm cho: "{searchQuery}"</h2>
            </div>
            {filteredMenu.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold">Không tìm thấy món ăn nào phù hợp... 🔍</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMenu.map((item) => (
                  <ProductCard key={item.id} item={item} quantity={quantities[item.id] || 0} updateQuantity={updateQuantity} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Default Category View UI */}
        {!searchQuery && (
          <div className="space-y-16">
            {CATEGORIES.map((category) => (
              <section
                key={category.id}
                ref={(el) => { categoryRefs.current[category.id] = el; }}
                className="scroll-mt-[180px]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                    <span className="text-4xl">{category.icon}</span>
                    {category.name}
                  </h2>
                  <div className="h-[2px] flex-1 bg-gray-200 mx-6 rounded-full hidden sm:block opacity-50" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {MENU.filter(item => item.category === category.id).map((item) => (
                    <ProductCard key={item.id} item={item} quantity={quantities[item.id] || 0} updateQuantity={updateQuantity} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Floating Cart & Mobile Checkout Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-orange-500" />
                  Giỏ hàng của bạn
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm"><X className="w-6 h-6" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 font-bold mb-4 italic">Hãy chọn món ngon trước khi thanh toán nhé! 🍜</p>
                    <button onClick={() => setIsCartOpen(false)} className="text-orange-500 font-black text-sm uppercase tracking-widest border-b-2 border-orange-200">Quay lại menu</button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border-2 border-gray-100 shadow-sm transition-all hover:bg-white hover:border-orange-100">
                          <img src={item.image} className="w-16 h-16 rounded-xl object-cover shadow-md border border-gray-200" alt={item.name} />
                          <div className="flex-1">
                            <h4 className="font-bold text-sm leading-tight text-gray-800">{item.name}</h4>
                            <p className="text-orange-500 font-black text-xs uppercase mt-1">{(item.price / 1000).toLocaleString()}k</p>
                          </div>
                          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg shadow-inner border border-gray-200">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-red-500 transition-colors"><Minus className="w-3 h-3" /></button>
                            <span className="w-5 text-center font-black text-xs">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-[#002C5F] transition-colors"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 pt-6 border-t border-dashed border-gray-200">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2 block">Họ và tên khách hàng</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-orange-500 transition-colors" />
                          <input
                            type="text"
                            placeholder="Nhập tên của bạn..."
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-11 pr-5 py-4 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/50 outline-none placeholder:text-gray-300 font-bold transition-all text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 bg-white border-t border-gray-50">
                  <div className="flex justify-between items-end mb-6 px-2">
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Tổng cộng tạm tính</span>
                    <span className="text-3xl font-black tracking-tighter text-[#002C5F]">{(totalPrice / 1000).toLocaleString()}k</span>
                  </div>
                  <button
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-3 text-lg border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <span className="relative z-10 flex items-center gap-2">Xác nhận đặt đơn <ChevronRight className="w-5 h-5" /></span>}
                  </button>
                  {error && <p className="mt-4 text-red-500 text-center text-xs font-bold leading-tight">{error}</p>}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {totalPrice > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 z-[40]"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="max-w-md mx-auto bg-[#002C5F] text-white rounded-3xl p-4 flex items-center justify-between shadow-2xl shadow-blue-900/40 border-2 border-blue-400/30 w-full group active:scale-95 transition-all outline-none"
            >
              <div className="flex flex-col pl-2 items-start text-left">
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest pl-1">Bạn đã chọn {cartItems.length} món</span>
                <span className="text-2xl font-black">{(totalPrice / 1000).toLocaleString()}k</span>
              </div>
              <div className="bg-orange-500 text-white font-black px-8 py-4 rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-900/40 border border-orange-400/50">
                Xem giỏ hàng
                <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Internal Helper Component ---
function ProductCard({ item, quantity, updateQuantity }: {
  item: FoodItem;
  quantity: number;
  updateQuantity: (id: string, delta: number) => void
}) {
  return (
    <motion.div
      layoutId={item.id}
      className="bg-white rounded-[2rem] p-4 flex gap-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-gray-50 hover:border-orange-200 group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative overflow-hidden rounded-2xl w-28 h-28 shrink-0 shadow-md border border-gray-100 bg-gray-50">
        <img src={item.item_image || item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="flex flex-col justify-between flex-1 py-1">
        <div>
          <h3 className="font-bold text-gray-800 line-clamp-2 leading-snug mb-1 text-sm">{item.name}</h3>
          <p className="text-orange-500 font-extrabold text-lg">{(item.price / 1000).toLocaleString()}k</p>
        </div>

        <div className="flex items-center self-end bg-gray-50 rounded-xl p-1 gap-1 border-2 border-gray-100 shadow-inner">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all disabled:opacity-30"
            disabled={quantity === 0}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-black text-sm">{quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="w-8 h-8 flex items-center justify-center bg-[#002C5F] text-white rounded-lg shadow-md border border-blue-900/20 hover:bg-[#003d82] active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
