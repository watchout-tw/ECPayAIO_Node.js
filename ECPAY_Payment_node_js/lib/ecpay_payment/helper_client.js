const ECpayError = require('./error.js');
const helper = require('./helper.js');
const payment_client = require('./payment_client.js');
const verify = require('./verification.js');

class ECpayHelperClient {
    constructor(options){
        this.helper = new helper(options);
        this.payment_client = new payment_client(options);
        this.verify_aiochkout = new verify.AioCheckOutParamVerify();
    }

  get_check_mac_value(period_info, parameters, invoice={}) {
      let unsupport = ['IgnorePayment', 'Redeem', 'CreditInstallment', 'InstallmentAmount'];
          this.payment_client._aiochkout_base_proc(parameters, invoice, unsupport, 'Credit');
          if (period_info.constructor === Object){
              let period_args = ['PeriodAmount', 'PeriodType', 'Frequency', 'ExecTimes', 'PeriodReturnURL'];
              period_args.sort().forEach(function (pname) {
                  if (Object.keys(period_info).sort().indexOf(pname, 0) === -1){
                      throw new Error(`Credit card period parameters must be ${period_args}.`);
                  }
              });
              Object.assign(parameters, period_info);
                  // Add total amount protection!!!

              this.verify_aiochkout.verify_aio_payment_param(parameters);
              // encode special param
              let sp_param = this.verify_aiochkout.get_special_encode_param('AioCheckOut');
              this.helper.encode_special_param(parameters, sp_param);
      
              // Insert chkmacval
              // console.log(params);
              let chkmac = this.helper.gen_chk_mac_value(parameters);
              
              return chkmac;
          } else {
              throw new Error(`Received period_info argument must be a Object.`);
          }
    }
}

module.exports = ECpayHelperClient;
