require.config({
    baseUrl:"base/",
    paths: {
        aavvw: 'aa',
        woshibb: 'bb',
        jquery: 'jquery',
        ud: "underscore",
        clz: "testClass"
    },
    urlArgs: "version=20150912"

});
/**
 * bb��define���͵÷���һ��������Ϊ�漰���հ�,�����޷��õ�����ķ���
 */
require(['aavvw', 'woshibb', 'clz'], function (undefined, bb, clz) {
    a();
    a1();
    bb.a();
    bb.a1();
    var aaa = new clz();
    console.debug(aaa.name);
})