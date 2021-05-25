/**
 * Created by ying.wu on 2017/6/9.
 */
const helper_client = require('./ecpay_payment/helper_client.js');
const version = require('./ecpay_payment/version.js');
const payment_client = require('./ecpay_payment/payment_client.js');
const query_client = require('./ecpay_payment/query_client.js');
const exec_grant_refund = require('./ecpay_payment/exec_grant_refund.js');

class ECPayPayment {
    constructor(options){
        this.helper_client = new helper_client(options);
        this.version = new version();
        this.payment_client = new payment_client(options);
        this.query_client = new query_client(options);
        this.exec_grant_refund = new exec_grant_refund(options);
    }
}
module.exports = ECPayPayment;