// Script to update product specifications to max option while keeping current style
document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL or page
  const productId = getProductIdFromPage();
  
  if (productId) {
    // Load product data and update specifications
    const jsonPath = getJsonPath();
    fetch(jsonPath)
      .then(response => response.json())
      .then(products => {
        const product = products.find(p => p.id == productId);
        if (product && product.specs) {
          updateProductSpecs(product);
        }
      })
      .catch(error => console.error("Error loading product data:", error));
  }
});

function getJsonPath() {
  // Determine the correct path to products.json based on current location
  const path = window.location.pathname;
  if (path.includes('/products/')) {
    return '../../js/products.json';
  } else if (path.includes('/asus/') || path.includes('/acer/') || path.includes('/HP/') || path.includes('/LG/') || path.includes('/MSI/')) {
    return '../../../js/products.json';
  } else {
    return 'js/products.json';
  }
}

function getProductIdFromPage() {
  // Try to get product ID from various sources
  const path = window.location.pathname;
  const match = path.match(/product(\d+)\.html/);
  if (match) {
    return parseInt(match[1]);
  }
  
  // Try to get from product title or other elements
  const titleElement = document.querySelector('.product-title');
  if (titleElement) {
    const title = titleElement.textContent;
    // Look for product ID patterns in title
    const idMatch = title.match(/(\d+)/);
    if (idMatch) {
      return parseInt(idMatch[1]);
    }
  }
  
  return null;
}

function updateProductSpecs(product) {
  // Update product title if needed
  const titleElement = document.querySelector('.product-title');
  if (titleElement && product.name) {
    titleElement.textContent = product.name;
  }
  
  // Update product price
  const priceElement = document.querySelector('.product-price');
  if (priceElement && product.price) {
    priceElement.textContent = `Giá: ${product.price}`;
  }
  
  // Update specifications section - Keep original style but update content
  const specsElement = document.querySelector('.product-specifications');
  if (specsElement && product.specs) {
    specsElement.innerHTML = `
      <strong>Thông số kỹ thuật:</strong> <br />
      Mainboard: ${getMainboardInfo(product.specs)} <br />
      CPU: ${product.specs.cpu} <br />
      Tản Nhiệt Khí: ${getCoolingInfo(product.specs)} <br />
      RAM: ${product.specs.ram} <br />
      Ổ cứng: ${product.specs.storage} <br />
      Card đồ họa: ${product.specs.gpu} <br />
    `;
  }
  
  // Update detailed description - Keep original style but update content
  const descriptionElement = document.querySelector('.product-description ul');
  if (descriptionElement && product.specs) {
    descriptionElement.innerHTML = `
      <li><strong>CPU:</strong> ${product.specs.cpu}</li>
      <li><strong>RAM:</strong> ${product.specs.ram}</li>
      <li><strong>Ổ cứng:</strong> ${product.specs.storage}</li>
      <li><strong>Card đồ họa:</strong> ${product.specs.gpu}</li>
      <li><strong>Màn hình:</strong> ${product.specs.display}</li>
      <li><strong>Cổng giao tiếp:</strong> ${product.specs.ports}</li>
      <li><strong>Keyboard:</strong> ${getKeyboardInfo(product.specs)}</li>
      <li><strong>Audio:</strong> ${getAudioInfo(product.specs)}</li>
      <li><strong>Đọc thẻ nhớ:</strong> ${getCardReaderInfo(product.specs)}</li>
      <li><strong>Chuẩn LAN:</strong> ${getLanInfo(product.specs)}</li>
      <li><strong>Chuẩn WIFI:</strong> ${product.specs.wifi}</li>
      <li><strong>Bluetooth:</strong> ${getBluetoothInfo(product.specs)}</li>
      <li><strong>Webcam:</strong> ${getWebcamInfo(product.specs)}</li>
      <li><strong>Hệ điều hành:</strong> ${product.specs.os}</li>
      <li><strong>Pin:</strong> ${product.specs.battery}</li>
      <li><strong>Trọng lượng:</strong> ${product.specs.weight}</li>
      <li><strong>Màu sắc:</strong> ${getColorInfo(product.specs)}</li>
      <li><strong>Kích thước:</strong> ${getSizeInfo(product.specs)}</li>
    `;
  }
}

// Helper functions to generate appropriate information
function getMainboardInfo(specs) {
  // Generate appropriate mainboard info based on CPU
  if (specs.cpu.includes('i9')) {
    return 'Intel Z790 Chipset - 4 Khe Ram DDR5';
  } else if (specs.cpu.includes('i7')) {
    return 'Intel H770 Chipset - 4 Khe Ram DDR5';
  } else {
    return 'Intel H610 Chipset - 2 Khe Ram DDR4';
  }
}

function getCoolingInfo(specs) {
  // Generate appropriate cooling info
  if (specs.cpu.includes('i9')) {
    return 'Liquid Cooling AIO 240mm';
  } else if (specs.cpu.includes('i7')) {
    return 'Air Cooling Tower 120mm';
  } else {
    return 'Stock Air Cooling';
  }
}

function getKeyboardInfo(specs) {
  // Generate appropriate keyboard info
  if (specs.type && specs.type.toLowerCase().includes('gaming')) {
    return 'RGB Mechanical Keyboard';
  } else {
    return 'Backlit Membrane Keyboard';
  }
}

function getAudioInfo(specs) {
  // Generate appropriate audio info
  if (specs.type && specs.type.toLowerCase().includes('gaming')) {
    return 'Dolby Atmos Gaming Audio';
  } else {
    return 'Dolby Audio Premium';
  }
}

function getCardReaderInfo(specs) {
  // Generate appropriate card reader info
  if (specs.ports && specs.ports.includes('SD')) {
    return 'SD Card Reader';
  } else {
    return 'None';
  }
}

function getLanInfo(specs) {
  // Generate appropriate LAN info
  if (specs.ports && specs.ports.includes('RJ45')) {
    return '10/100/1000/Gigabits Base T';
  } else {
    return 'None';
  }
}

function getBluetoothInfo(specs) {
  // Extract Bluetooth version from connectivity
  if (specs.wifi && specs.wifi.includes('Bluetooth')) {
    const match = specs.wifi.match(/Bluetooth ([\d.]+)/);
    return match ? `v${match[1]}` : 'v5.3';
  }
  return 'v5.3';
}

function getWebcamInfo(specs) {
  // Generate appropriate webcam info
  if (specs.display && specs.display.includes('4K')) {
    return '4K Webcam with IR';
  } else {
    return 'HD Webcam 720p';
  }
}

function getColorInfo(specs) {
  // Generate appropriate color info
  const colors = ['Abyssal Black', 'Space Gray', 'Silver', 'White', 'Red', 'Blue'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getSizeInfo(specs) {
  // Generate appropriate size info based on display
  if (specs.display) {
    const sizeMatch = specs.display.match(/(\d+\.?\d*)"/);
    if (sizeMatch) {
      const size = parseFloat(sizeMatch[1]);
      if (size <= 13) {
        return '300 x 200 x 15 (mm)';
      } else if (size <= 15) {
        return '361.4 x 254.15 x 22.9 (mm)';
      } else {
        return '380 x 260 x 25 (mm)';
      }
    }
  }
  return '361.4 x 254.15 x 22.9 (mm)';
}

