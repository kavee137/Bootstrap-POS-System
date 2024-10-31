export default class OrderModel{
    constructor(oid, cid, date, items = [], cash, balance, total) {
        this._oid = oid;
        this._cid = cid;
        this._date = date;
        this._items = items;
        this._cash = cash;
        this._balance = balance;
        this._total = total;
    }

    get oid() {
        return this._oid;
    }

    set oid(value) {
        this._oid = value;
    }

    get cid() {
        return this._cid;
    }

    set cid(value) {
        this._cid = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
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