/**
 * ��ʱ��util,������moment.js
 * @param method
 * @returns {*}
 */
;
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(['jquery', 'moment'], factory);
    } else {
        factory(jQuery, moment);
    }
}(function ($, moment) {
    $.fn.cmtimerUtil = function (method) {
        var setting = {
            beginTime: null,//�Լ�д�Ŀ�ʼ��ʱ����
            serverTime: null,//��̨�����ĵ�ǰ��������ֵd_now
            totalTime: 1500, //206150;20Сʱ61������50���ʱ���ʱ
            passby: 1000, //ÿ1000���붨ʱһ��
            delay: 0,//�ӳ�
            onInit: null,
            onTimeFlies: null,//��ʱ����
            onEnd: null//��ʱ����
        };
        var methods = {
            init: function (option) {
                return this.each(function () {
                    var $cont = $(this), opt = $cont.data("cmtimerUtil");
                    if (typeof opt === 'undefined') {
                        opt = $.extend({}, setting, option);
                    } else {
                        $.extend(opt, option);
                    }
                    $cont.data("cmtimerUtil", opt);
                    var d_begin, d_now, _dateNow = new Date();
                    d_begin = opt.beginTime ? new moment(opt.beginTime) : moment(_dateNow);
                    d_now = opt.serverTime ? new moment(opt.serverTime) : moment(_dateNow);

                    if (!d_begin.isValid() || !d_now.isValid()) {
                        console.error('beginTime or serverTime is not valid.');
                        return;
                    }
                    if (!d_begin.isAfter(d_now)) {
                        if (opt.delay > 0) {
                            var pt = convertStr2seconds(Math.abs(opt.delay));
                            //��ʼʱ���Ƴ�
                            d_begin.add(pt, 's');
                        }
                        var n_b_diff = d_now.diff(d_begin);
                        var total_secs = convertStr2seconds(opt.totalTime);
                        if (n_b_diff >= 0) {
                            var n_b_diff_seconds = n_b_diff / 1000;
                            //begin��now��ʱ����ȥ��Ҫ��begin��ʼ��ʱ��ʱ���,��С��0�Ļ���˵����ʱ�Ѿ����ˣ�С��0����ʾ����Ҫ��ʱ��
                            var _diff = n_b_diff_seconds - total_secs;

                            if (_diff >= 0) {
                                if (opt.onEnd && $.isFunction(opt.onEnd)) {
                                    opt.onEnd.call($cont);//��ʱ�ѽ���
                                }
                            } else {
                                beginTimer.call($cont, -_diff);//��ʱʣ���ʱ��
                            }

                        } else {
                            //��ʼ��ʱʱ�仹û��(�뵱ǰʱ���)
                            delayToStart.call($cont, Math.abs(n_b_diff), total_secs);
                        }
                    } else {
                        if (opt.onEnd && $.isFunction(opt.onEnd)) {
                            opt.onEnd.call($cont);//��ʱ�ѽ���
                        }
                    }


                });

            },

            getIsTiming: function () {
                //TODO 'P','T','N'.passed,timing,has not begin
            },
            pause: function () {
                return this.each(function () {
                    var $cont = $(this), opt = $cont.data("cmtimerUtil"), _timer = $cont.data("cmtimerutil_timer");
                    if (typeof opt !== 'undefined') {
                        clearInterval(_timer);
                    }
                });
            }
        };

        function convertStr2seconds(totalTime) {
            var _t = String(totalTime), len = _t.length, total_secs = 0;
            if (len > 8) {
                console.error('too long,timer walks off the job,����8λ���Ҳ���ʱ(�����λ����) ');
            } else {
                _t = String(100000000 + totalTime);
                var mins = parseInt(_t.substr(-4, 2));
                var seconds = parseInt(_t.substr(-2, 2));
                var hours = parseInt(_t.substr(-6, 2));
                var days = parseInt(_t.substr(-8, 2));
                total_secs = countTotalSeconds(seconds, mins, hours, days);
            }
            return total_secs;
        }

        function countTotalSeconds(sec, min, hour, days) {
            return sec + min * 60 + hour * 60 * 60 + days * 24 * 60 * 60;
        }

        function delayToStart(delay, total_secs) {
            var $cont = $(this), opt = $cont.data("cmtimerUtil");
            var timer_delay = setTimeout(function () {
                beginTimer.call($cont, total_secs);
            }, delay);
        }

        /**
         * ��ʱ����
         * @param total_secs
         */
        function beginTimer(total_secs) {
            console.log("�ܼ�ʱ��ʼ(seconds)��" + total_secs);
            var $cont = $(this), opt = $cont.data("cmtimerUtil"), _timer = $cont.data("cmtimerutil_timer");
            if (_timer) {
                clearInterval(_timer);
            }
            _timer = setInterval(function () {
                total_secs--;
                if (total_secs < 0) {
                    clearInterval(_timer);

                    if (opt.onEnd && $.isFunction(opt.onEnd)) {
                        opt.onEnd.call($cont);
                    }
                } else {
                    if (opt.onTimeFlies && $.isFunction(opt.onTimeFlies)) {
                        //�ص����������и��������ǵ�ǰʣ���ʱ��
                        opt.onTimeFlies.call($cont, formatTime(total_secs));
                    }

                }
            }, opt.passby);
            $cont.data("cmtimerutil_timer", _timer);
        }

        /**
         * ��ʱ��תΪСʱ�ֺ���
         * @param c
         * @returns {{}}
         */
        function formatTime(c) {
            var obj = {};
            obj.days = parseInt(c / (3600 * 24));
            obj.hours = parseInt((c % (3600 * 24)) / 3600);
            // Сʱ��
            obj.mins = parseInt(c / 60);
            // ������
            if (obj.mins >= 60) {
                obj.mins = obj.mins % 60;
            }
            obj.sencs = c % 60;
            console.debug(JSON.stringify(obj));
            return obj;
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods["init"].apply(this, arguments);
        } else {
            $.error("Method:" + method + "doesn't exisit!");
            return this;
        }

    };
}));

