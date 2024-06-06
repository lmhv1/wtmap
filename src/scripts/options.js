(function () {
    'use strict';

    var $inputs = $('input');
    var $text_inputs = $inputs.filter('[type=text]');
    var $checkbox_inputs = $inputs.filter('[type=checkbox]');

    var $plane_icon_preview = $('#plane_icon_preview');
    var $plane_icon_size = $('#plane_icon_size');

    $text_inputs.keyup(function () {
        var $this = $(this);
        $this.data('changed', $this.val() != WTM.settings[$this.attr('id')]);
    });

    if (localStorage.options_installed !== 'true') {
        localStorage.options_installed = 'true';
        $('#installed').show();
    }

    var previews = {};
    $.each(WTM.icons, function (key) {
        var icon = $('<span>').text(key);
        $plane_icon_preview.append(icon);
        previews[key] = icon;
    });

    function update_icons() {
        var size = parseInt($plane_icon_size.val(), 10) || WTM.defaults.plane_icon_size;
        $.each(WTM.icons, function (key, value) {
            previews[key].css({
                'fontSize': size * value + 'px'
            });
        });
    }

    $plane_icon_size.keyup(update_icons);

    var $unit_inputs = $inputs.filter('[name=units]');
    $unit_inputs.change(function () {
        var $this = $(this);
        var val = $this.val();
        $unit_inputs.not($this).data('changed', false);
        $this.data('changed', val !== WTM.settings.units);
    });

    $checkbox_inputs.change(function () {
        var $this = $(this);
        $this.data('changed', this.checked * 1 !== WTM.settings[$this.attr('id')]);
    });

    function load_values() {
        var settings = WTM.settings;
        $text_inputs.each(function () {
            var $this = $(this);
            var key = $this.attr('id');
            var val = settings[key];
            $this.data('changed', false);
            $this.val(val);
        });

        $checkbox_inputs.each(function () {
            var $this = $(this);
            this.checked = !!settings[$this.attr('id')];
            $this.data('changed', false);
        });

        $unit_inputs.data('changed', false);
        $unit_inputs.filter('[value=' + settings.units + ']').click();
        update_icons();
    }

    var status_timeout;

    function display_status(text) {
        $status.text(text);
        window.clearTimeout(status_timeout);
        status_timeout = window.setTimeout(function () {
            $status.text('');
        }, 3000);
    }

    load_values();

    var $status = $('#status');
    $('#save').click(function () {
        chrome.permissions.remove({
                origins: [WTM.settings.base_url]
            },
            function () {});
        var units = $unit_inputs.filter(':checked').val();

        $text_inputs.each(function () {
            var $this = $(this);
            var val = $this.val().trim();
            var key = $this.attr('id');
            var default_val = WTM.defaults[key];
            if (typeof default_val === 'number') {
                val = parseFloat(val, 10);
            }
            if ((!val && val !== 0) || val === default_val) {
                // Reset to default
                localStorage.removeItem(key);
                return;
            }
            localStorage[key] = val;
        });

        $checkbox_inputs.each(function () {
            var $this = $(this);
            var val = this.checked * 1;
            var key = $this.attr('id');

            if (val === WTM.defaults[key]) {
                localStorage.removeItem(key);
            } else {
                localStorage[key] = val;
            }
        });

        localStorage.units = units;
        WTM.update();
        load_values();

        chrome.permissions.request({
                origins: [WTM.settings.base_url]
            },
            function () {});

        display_status('Options saved');
    });
    $('#restore').click(function () {
        if (!confirm('Are you sure you want to restore the default options?')) {
            return;
        }
        WTM.settings = jQuery.extend({}, WTM.defaults);
        $.each(WTM.defaults, function (key) {
            localStorage.removeItem(key);
        });
        load_values();

        display_status('Defaults restored');
    });

    window.onbeforeunload = function () {
        var changes = false;
        $inputs.each(function () {
            if ($(this).data('changed')) {
                changes = true;
                return false;
            }
        });
        if (changes) {
            return 'Unsaved changes.';
        }
    };

    $('#show_advanced button').click(function () {
        $('tr.advanced').show();
        $(this).attr('disabled', 'disabled');
    });

    $('#goto a').each(function () {
        var $this = $(this);
        $('<a id="goto_sub">')
            .attr('href', $this.attr('href'))
            .text('WT map')
            .mousedown(function () {
                $this.addClass('active');
            })
            .mouseup(function () {
                $this.removeClass('active');
            })
            .mouseleave(function () {
                $this.removeClass('active');
            })
            .appendTo($this.parent());
    });

    $('#coop_enabled').change(function () {
        $('#tr_coop_ips').toggle(this.checked);
        $('#tr_coop_update_rate').toggle(this.checked);
    }).change();
})();
