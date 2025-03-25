let cart = [];
let total = 0;
let remaining = 0; // Initialize remaining amount

function showCategory(category) {
    document.getElementById('snacks').style.display = 'none';
    document.getElementById('drinks').style.display = 'none';
    document.getElementById(category).style.display = 'grid'; // Show selected category
}

function addToCart(item, price) {
    cart.push({ item: item, price: price });
    total += price;
    remaining = total; // Update remaining to match total
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    cartItems.innerHTML = '';
    cart.forEach((cartItem, index) => {
        cartItems.innerHTML += `<li>${cartItem.item} - ${cartItem.price} THB 
        <button onclick="removeFromCart(${index})">Remove</button></li>`;
    });
    
    totalPrice.innerText = total;
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1); // Remove item
    updateCart();
}

function goToCheckout() {
    const queryString = new URLSearchParams({
        cart: JSON.stringify(cart),
        total: total
    }).toString();
    window.location.href = `checkout.html?${queryString}`;
}

function openModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.innerText = message;
    modal.style.display = 'block'; // Show modal
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; // Hide modal
}



function addMoney(amount) {
    remaining -= amount; // หักยอดที่จ่ายเพิ่ม

    // ถ้ามีเงินเกิน ต้องทอนเงิน
    if (remaining < 0) {
        const refund = Math.abs(remaining); // คำนวณจำนวนเงินที่ต้องทอน
        showNotification(`กำลังทอนเงิน ${refund} บาท`);
        remaining = 0; // รีเซ็ตยอดเงินที่เหลือเป็น 0 เพราะทอนเงินครบแล้ว
        document.getElementById('remainingAmount').innerText = remaining; // อัปเดตยอดที่เหลือ

        // แจ้งให้ผู้ใช้หยิบสินค้า
        setTimeout(() => {
            showNotification('กรุณาหยิบสินค้า');
        }, 3000); // แสดงข้อความหลังจากทอนเงินเสร็จ 3 วินาที
    }

    // ถ้ายอดเงินครบพอดี
    else if (remaining === 0) {
        showNotification('กรุณาหยิบสินค้า');
    }

    // อัปเดตยอดเงินที่เหลือที่ต้องจ่าย
    document.getElementById('remainingAmount').innerText = remaining;
}
