/**
 * �ַ�����Ȳ��� ajax(complete,beforeSend) loading dialog ʱ����� ������֤
 * date array Math list map(immutable),loadsh&underscore,es5 API,reduce,string
 * ͼƬ��lazyload
 * Created by guowei.dong on 2015/8/19.
 */
define(['jquery', 'underscore'], function ($, _) {
    function browser(){}
    function log(){
        console.debug();
    }
    function dateAbt() {
        var d = new Date;
        var d2=new Date('2011-11-11 23:59:59');
        console.debug(d2.toTimeString(),d2.toDateString(),d2.toLocaleString());//��ʱ��
        console.debug(d2.toGMTString(),d2.toISOString(),d2.toUTCString());//�������Σ���Э������ʱ

        log(d.getFullYear(), 1);
        log(d.getMonth() + 1);
        log(d.getDate())
        log(d.getHours())
        log(d.getMinutes())
        log(d.getMilliseconds())
        log(d.getTime());
        log(d.toLocaleDateString())
        log(d.toLocaleString());
        document.write(d.toLocaleString())
        log(d.toLocaleTimeString());
    }


});