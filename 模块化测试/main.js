require.config({
    paths: {
        aavvw: 'aa',
        woshibb: 'bb',
        jquery:'jquery',
        ud:"underscore"
    },
    urlArgs: "version=20150805"

});
/**
 * bb��define���͵÷���һ��������Ϊ�漰���հ�,�����޷��õ�����ķ���
 */
require(['aavvw', 'woshibb'], function (undefined, bb) {
    a();
    a1();
    bb.a();
    bb.a1();

})