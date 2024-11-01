export default class OrderModel{
    constructor(orderId, cusId, date, cart, cash, balance, total) {
        this._orderId = orderId;
        this._cusId = cusId;
        this._date = date;
        this._cart = cart;
        this._cash = cash;
        this._balance = balance;
        this._total = total;
    }


    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get cusId() {
        return this._cusId;
    }

    set cusId(value) {
        this._cusId = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get cart() {
        return this._cart;
    }

    set cart(value) {
        this._cart = value;
    }

    get cash() {
        return this._cash;
    }

    set cash(value) {
        this._cash = value;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}