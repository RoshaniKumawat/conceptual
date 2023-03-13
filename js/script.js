    
    <!------------------gallery--------------------->
    
        $('#trustgallery').lightGallery({
            selector: '.item',
            mode: 'lg-fade',
            counter: true,
            download: true,
            startClass: '',
            enableSwipe: true,
            enableDrag: true,
            speed: 500,
            thumbnail: false,
        });

    <!---------number(counter-codepen)--------->

        (function($) {
            $.fn.countTo = function(options) {
                options = options || {};

                return $(this).each(function() {
                  // set options for current element
                  var settings = $.extend(
                    {},
                    $.fn.countTo.defaults,
                    {
                      from: $(this).data("from"),
                      to: $(this).data("to"),
                      speed: $(this).data("speed"),
                      refreshInterval: $(this).data("refresh-interval"),
                      decimals: $(this).data("decimals")
                    },
                    options
                );

                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;

                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data("countTo") || {};

                $self.data("countTo", data);

                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                // initialize the element with the starting value
                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof settings.onUpdate == "function") {
                      settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                      // remove the interval
                      $self.removeData("countTo");
                      clearInterval(data.interval);
                      value = settings.to;

                      if (typeof settings.onComplete == "function") {
                        settings.onComplete.call(self, value);
                      }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                  }
                });
            };

            $.fn.countTo.defaults = {
                from: 0, // the number the element should start at
                to: 0, // the number the element should end at
                speed: 1000, // how long it should take to count between the target numbers
                refreshInterval: 100, // how often the element should be updated
                decimals: 0, // the number of decimal places to show
                formatter: formatter, // handler for formatting the value before rendering
                onUpdate: null, // callback method for every time the element is updated
                onComplete: null // callback method for when the element finishes updating
            };

            function formatter(value, settings) {
                return value.toFixed(settings.decimals);
            }
        })(jQuery);

        jQuery(function($) {
            // custom formatting example
            $(".count-number").data("countToOptions", {
                formatter: function(value, options) {
                  return value
                    .toFixed(options.decimals)
                    .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
                }
            });

            // start all the timers
            $(".timer").each(count);

            function count(options) {
                var $this = $(this);
                options = $.extend({}, options || {}, $this.data("countToOptions") || {});
                $this.countTo(options);
            }
        });
   
    <!----timers-(codepen)---->

        // Set the date we're counng down to
        var countDownDate = new Date("nov 22, 2023 15:37:25").getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();
            
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Output the result in an element with id="demo"
            document.getElementById("days").innerHTML = days;

            document.getElementById("hourse").innerHTML =hours;

            document.getElementById("minutes").innerHTML = minutes;

            document.getElementById("seconds").innerHTML =seconds;
            
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "EXPIRED";
            }
        }, 1000);
    
    