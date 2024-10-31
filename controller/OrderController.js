import OrderModel from "../models/orderModel.js";
import CartModel from "../models/cartModel.js";
import { customer_array, item_array, cart_array, order_array } from "../db/database.js";

$(document).ready(function () {
    $("#order-nav").on("click", function (event) {
        console.log("orderNav clicked");
        event.preventDefault();
        loadCustomerSelect();
        loadItemSelect();
    });
});

const loadCustomerSelect = () => {
    $('#customerIdSelector').empty();
    $('#customerIdSelector').append('<option value="">Select Customer</option>');

    customer_array.forEach((customer) => {
        let option = `<option value="${customer.id}">${customer.id}</option>`;
        $("#customerIdSelector").append(option);
    });
};

const loadItemSelect = () => {
    $('#itemIdSelector').empty();
    $('#itemIdSelector').append('<option value="">Select Item</option>');

    item_array.forEach((item) => {
        let option = `<option value="${item._itemId}">${item._itemId}</option>`;
        $("#itemIdSelector").append(option);
    });
};

$("#customerIdSelector").on("change", function (event) {
    event.preventDefault();
    let index = $(this).prop('selectedIndex');
    if (index > 0) {
        $("#orderCustomerName").val(customer_array[index - 1]._first_name);  // Ensure correct index
        $("#orderCustomerAddress").val(customer_array[index - 1]._address);  // Ensure correct index
        $("#orderCustomerTel").val(customer_array[index - 1]._mobile);  // Ensure correct index
    }
});

let unitPrice = 0;

$("#itemIdSelector").on("change", function (event) {
    event.preventDefault();
    let index = $(this).prop('selectedIndex');
    if (index > 0) {
        $("#OrderItemName").val(item_array[index - 1]._itemName);  // Ensure correct index
        $("#OrderItemUnitPrice").val(item_array[index - 1]._itemUnitPrice);  // Ensure correct index
        $("#OrderItemQtyOnHand").val(item_array[index - 1]._itemQtyOnHand);  // Ensure correct index
         unitPrice = item_array[index - 1]._itemUnitPrice;
    }
});

export function calculateTotal() {
    console.log("calculate fuction")
    const qty = document.getElementById('orderQty').value;

    // Calculate the total
    const total = qty * unitPrice;

    // Set the total value to the 'orderTotal' input field
    document.getElementById('orderTotal').value = total ? total.toFixed(2) : '';
}


let orderTotal= 0;
$("#btnAddToCart").on("click", function (event) {
    event.preventDefault();

    let itemId = $('#itemIdSelector').val();
    let itemName = $('#OrderItemName').val();
    let qty = $('#orderQty').val();
    let unitPrice = $('#OrderItemUnitPrice').val();
    let total = $('#orderTotal').val();
    let qtyOnHand = $('#OrderItemQtyOnHand').val();

    if (qty.length === 0 || unitPrice.length === 0 || qty > qtyOnHand || qty <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select item or enter item qty!",
        });
    } else {

        orderTotal += +total;

        let cartItem = new CartModel(
            itemId,
            itemName,
            qty,
            unitPrice,
            total
        );

        cart_array.push(cartItem);
        loadCartTable();
        clearItemFields();

        // $("#orderSummeryTotalLbl").clear();
        $("#orderSummeryTotalLbl").val(orderTotal);

    }

})

const clearItemFields = () => {
    $("#itemIdSelector").val('');
    $("#OrderItemName").val('');
    $("#OrderItemQtyOnHand").val('');
    $("#OrderItemUnitPrice").val('');
    $("#orderQty").val('');
    $("#orderTotal").val('');
};





const loadCartTable = () => {
    $("#cartTableBody").empty();
    cart_array.map((item, index) => {
        console.log(item);
        // let data = `<tr><td>${item.id}</td><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.address}</td><td>${item.mobile}</td></tr>`

        let data = `<tr><td>${item._itemId}</td><td>${item._itemName}</td><td>${item._unitPrice}</td><td>${item._qty}</td><td>${item._total}</td><td><button className="btn btn-danger btn-sm">Remove</button></td></tr>`

        $("#cartTableBody").append(data);
    })
}

$(document).ready(function() {
    // Event listener for the cash input field
    $('#cash').on('input', function() {
        const total = parseFloat($('#orderSummeryTotalLbl').val()) || 0;
        const cash = parseFloat($(this).val()) || 0;
        const balance = cash - total;

        // Display the balance
        $('#balance').val(balance >= 0 ? balance.toFixed(2) : '0.00');
    });
});




let oId = -1;

// generate new order ID
$('#oID').val(order_array.length+1);


// Generate new order ID
const generateNewOrderId = () => {
    if (order_array.length === 0) {
        oId = 1;
        $('#id').val(oId);
    } else {
        oId = order_array.length+1;
        $('#oID').val(oId);
    }
}






$("#btnPlaceOrder").on("click", function (event) {



    if (cart_array.length<=0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please add at least one item to cart!",
        });
    } else {

        let orderId = $('#oID').val();
        let date = $('#date').val();
        let cusId = $('#customerIdSelector').val();
        let cartArray = cart_array;
        let cash = $('#cash').val();
        let balance = $('#balance').val();
        let total = $('#balance').val();

        let placedOrder = new OrderModel(
            orderId,
            date,
            cusId,
            cartArray,
            cash,
            balance,
            total
        )

        order_array.push(placedOrder);
        $("#cartTableBody").empty();
        clearItemFields();
        console.log(placedOrder);
        generateNewOrderId()

    }




})









