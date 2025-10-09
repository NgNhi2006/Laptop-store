/**
 * Chatbot Database - FAQ and responses management
 */
class ChatbotDatabase {
  constructor() {
    this.faqs = [
      // Greeting FAQs
      {
        keywords: ['xin chào', 'hello', 'hi', 'chào', 'chào bạn'],
        message: '👋 Xin chào! Tôi là trợ lý ảo của cửa hàng laptop. Tôi có thể giúp bạn tìm hiểu về sản phẩm, giá cả, bảo hành và kết nối với nhân viên hỗ trợ.',
        quickActions: 'main'
      },
      
      // Product FAQs
      {
        keywords: ['laptop gaming', 'máy chơi game', 'gaming laptop'],
        message: '🎮 Chúng tôi có nhiều laptop gaming chất lượng cao từ các thương hiệu như ASUS ROG, MSI, HP Omen. Bạn quan tâm đến cấu hình nào?',
        quickActions: 'gaming'
      },
      {
        keywords: ['laptop văn phòng', 'laptop học tập', 'laptop sinh viên'],
        message: '💼 Chúng tôi có nhiều laptop phù hợp cho văn phòng và học tập với giá từ 8-15 triệu. Bạn cần cấu hình như thế nào?',
        quickActions: 'office'
      },
      {
        keywords: ['laptop đồ họa', 'laptop thiết kế', 'laptop kỹ thuật'],
        message: '🎨 Laptop đồ họa cần card đồ họa mạnh. Chúng tôi có các model từ NVIDIA RTX series phù hợp cho thiết kế.',
        quickActions: 'graphics'
      },
      
      // Brand FAQs
      {
        keywords: ['asus', 'asus laptop'],
        message: '🖥️ ASUS là thương hiệu uy tín với dòng ROG cho gaming và ZenBook cho văn phòng. Bạn quan tâm dòng nào?',
        quickActions: 'asus'
      },
      {
        keywords: ['hp', 'hp laptop'],
        message: '💻 HP có nhiều dòng laptop từ Pavilion cho văn phòng đến Omen cho gaming. Bạn cần laptop cho mục đích gì?',
        quickActions: 'hp'
      },
      {
        keywords: ['msi', 'msi laptop'],
        message: '⚡ MSI nổi tiếng với laptop gaming và workstation. Bạn quan tâm đến dòng nào?',
        quickActions: 'msi'
      },
      {
        keywords: ['acer', 'acer laptop'],
        message: '🖱️ Acer có dòng Aspire cho văn phòng và Predator cho gaming. Bạn cần laptop cho mục đích gì?',
        quickActions: 'acer'
      },
      {
        keywords: ['lg', 'lg laptop'],
        message: '📱 LG có dòng Gram siêu nhẹ và mỏng, phù hợp cho di chuyển nhiều. Bạn cần laptop nhẹ không?',
        quickActions: 'lg'
      },
      
      // Price FAQs
      {
        keywords: ['giá rẻ', 'laptop rẻ', 'tầm 10 triệu', 'dưới 10 triệu'],
        message: '💰 Chúng tôi có nhiều laptop giá rẻ từ 8-12 triệu với cấu hình phù hợp cho văn phòng và học tập.',
        quickActions: 'budget'
      },
      {
        keywords: ['giá cao', 'laptop đắt', 'tầm 20 triệu', 'trên 20 triệu'],
        message: '💎 Laptop cao cấp từ 20-50 triệu với cấu hình mạnh, phù hợp cho gaming và đồ họa chuyên nghiệp.',
        quickActions: 'premium'
      },
      
      // Warranty FAQs
      {
        keywords: ['bảo hành', 'warranty', 'sửa chữa'],
        message: '🛡️ Chúng tôi cung cấp bảo hành chính hãng 12-24 tháng tùy sản phẩm. Hỗ trợ sửa chữa tại trung tâm bảo hành.',
        quickActions: 'warranty'
      },
      {
        keywords: ['đổi trả', 'hoàn tiền', 'đổi mới'],
        message: '🔄 Chính sách đổi trả trong 7 ngày đầu nếu sản phẩm lỗi. Hoàn tiền 100% nếu không hài lòng.',
        quickActions: 'return'
      },
      
      // Support FAQs
      {
        keywords: ['hỗ trợ', 'tư vấn', 'giúp đỡ'],
        message: '🆘 Tôi có thể kết nối bạn với nhân viên tư vấn chuyên nghiệp. Bạn có muốn chat trực tiếp không?',
        quickActions: 'support'
      },
      {
        keywords: ['liên hệ', 'hotline', 'số điện thoại'],
        message: '📞 Hotline: 0967 359 543\n💬 Zalo: 0862744098\n📧 Email: tniw.dev@gmail.com\n🕒 Giờ làm việc: 8:00-17:00 (T2-T6)',
        quickActions: 'contact'
      }
    ];
    
    this.quickActions = {
      main: [
        { text: '💻 Xem sản phẩm', action: 'products' },
        { text: '💰 Hỏi giá', action: 'price' },
        { text: '🛡️ Bảo hành', action: 'warranty' },
        { text: '💬 Chat với nhân viên', action: 'live_chat' }
      ],
      products: [
        { text: '🎮 Gaming', action: 'gaming' },
        { text: '💼 Văn phòng', action: 'office' },
        { text: '🎨 Đồ họa', action: 'graphics' },
        { text: '📱 Nhẹ & mỏng', action: 'ultrabook' }
      ],
      brands: [
        { text: 'ASUS', action: 'asus' },
        { text: 'HP', action: 'hp' },
        { text: 'MSI', action: 'msi' },
        { text: 'Acer', action: 'acer' },
        { text: 'LG', action: 'lg' }
      ],
      asus: [
        { text: 'ROG Gaming', action: 'asus_rog' },
        { text: 'ZenBook', action: 'asus_zenbook' },
        { text: 'VivoBook', action: 'asus_vivobook' },
        { text: '💬 Tư vấn ASUS', action: 'live_chat' }
      ],
      hp: [
        { text: 'Omen Gaming', action: 'hp_omen' },
        { text: 'Pavilion', action: 'hp_pavilion' },
        { text: 'EliteBook', action: 'hp_elitebook' },
        { text: '💬 Tư vấn HP', action: 'live_chat' }
      ],
      msi: [
        { text: 'Gaming Series', action: 'msi_gaming' },
        { text: 'Workstation', action: 'msi_workstation' },
        { text: 'Creator', action: 'msi_creator' },
        { text: '💬 Tư vấn MSI', action: 'live_chat' }
      ],
      acer: [
        { text: 'Predator Gaming', action: 'acer_predator' },
        { text: 'Aspire', action: 'acer_aspire' },
        { text: 'Swift', action: 'acer_swift' },
        { text: '💬 Tư vấn Acer', action: 'live_chat' }
      ],
      lg: [
        { text: 'Gram Series', action: 'lg_gram' },
        { text: 'Ultra PC', action: 'lg_ultra' },
        { text: '💬 Tư vấn LG', action: 'live_chat' }
      ],
      gaming: [
        { text: 'ASUS ROG', action: 'asus_rog' },
        { text: 'MSI Gaming', action: 'msi_gaming' },
        { text: 'HP Omen', action: 'hp_omen' },
        { text: 'Acer Predator', action: 'acer_predator' }
      ],
      office: [
        { text: 'ASUS ZenBook', action: 'asus_zenbook' },
        { text: 'HP Pavilion', action: 'hp_pavilion' },
        { text: 'Acer Aspire', action: 'acer_aspire' },
        { text: 'LG Gram', action: 'lg_gram' }
      ],
      graphics: [
        { text: 'NVIDIA RTX', action: 'rtx_series' },
        { text: 'Workstation', action: 'workstation' },
        { text: 'Creator Laptop', action: 'creator' },
        { text: '💬 Tư vấn đồ họa', action: 'live_chat' }
      ],
      budget: [
        { text: 'Dưới 10 triệu', action: 'under_10m' },
        { text: '10-15 triệu', action: '10_15m' },
        { text: '💬 Tư vấn giá rẻ', action: 'live_chat' }
      ],
      premium: [
        { text: '20-30 triệu', action: '20_30m' },
        { text: '30-50 triệu', action: '30_50m' },
        { text: 'Trên 50 triệu', action: 'over_50m' },
        { text: '💬 Tư vấn cao cấp', action: 'live_chat' }
      ],
      warranty: [
        { text: 'Chính sách bảo hành', action: 'warranty_policy' },
        { text: 'Trung tâm bảo hành', action: 'warranty_center' },
        { text: 'Sửa chữa', action: 'repair' },
        { text: '💬 Hỗ trợ bảo hành', action: 'live_chat' }
      ],
      support: [
        { text: '💬 Chat trực tiếp', action: 'live_chat' },
        { text: '📞 Gọi điện', action: 'call' },
        { text: '📧 Gửi email', action: 'email' },
        { text: '💬 Zalo', action: 'zalo' }
      ],
      contact: [
        { text: '📞 Gọi ngay', action: 'call' },
        { text: '💬 Chat Zalo', action: 'zalo' },
        { text: '📧 Gửi email', action: 'email' },
        { text: '🔙 Quay lại', action: 'back' }
      ]
    };
  }

  /**
   * Find response for user message
   */
  findResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const faq of this.faqs) {
      for (const keyword of faq.keywords) {
        if (lowerMessage.includes(keyword)) {
          return {
            message: faq.message,
            quickActions: faq.quickActions
          };
        }
      }
    }
    
    return null;
  }

  /**
   * Get quick actions for category
   */
  getQuickActions(category) {
    return this.quickActions[category] || [];
  }

  /**
   * Get welcome message
   */
  getWelcomeMessage() {
    return '👋 Xin chào! Tôi là trợ lý ảo của cửa hàng laptop. Tôi có thể giúp bạn:\n\n• Tìm hiểu sản phẩm laptop\n• Tư vấn cấu hình phù hợp\n• Cung cấp thông tin giá cả\n• Hỗ trợ bảo hành\n• Kết nối với nhân viên tư vấn\n\nBạn cần hỗ trợ gì?';
  }

  /**
   * Get default response
   */
  getDefaultResponse() {
    const responses = [
      '🤔 Tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi cụ thể hơn không?',
      '💭 Bạn có thể hỏi về sản phẩm, giá cả, bảo hành hoặc kết nối với nhân viên tư vấn.',
      '🆘 Tôi có thể giúp bạn tìm hiểu về laptop, giá cả, bảo hành. Bạn quan tâm đến điều gì?',
      '💡 Bạn có thể hỏi về thương hiệu laptop, cấu hình, giá cả hoặc bảo hành.',
      '🎯 Hãy cho tôi biết bạn cần hỗ trợ gì cụ thể nhé!'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
