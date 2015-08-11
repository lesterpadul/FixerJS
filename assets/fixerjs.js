/**
 * FIXER JS
 * Company : FDC
 * Contributors : {
 * 	Lester Padul (2015)
 * },
 * Dependencies : {
 * 	momentjs,
 * 	jquery 1.7++
 * }
 */
(function ( $ ) {
	// result : {
	// 		element : <element of error />,
	// 		sin : <sin of element that returned an error />,
	// 		props : <properties of element />
	// }
	var result = [];
    // initialize the fixerjs
    $.fn.fixerInit = function (options) {
       	// set the default values
        var settings = $.extend({
        }, options);
        console.clear();
        // process the result of the validation
        bindValidatorEvent(this);
    };

    /**
     * perform custom fixer method
     * @param  method - method to be performed
     */
    $.fn.fixerMethod = function (method) {
    }

    /**
     * process the individual validators
     * @return {[type]} [description]
     */
    function processIndividualClassValidators (element) {
    	// check if numeric validator is present
    	if ($(element).hasClass('fixer-numeric')) {
    		validatorIsNumeric(element);
    	}
    	// check if phone validator is present
    	if ($(element).hasClass('fixer-phone')) {
    		validatorIsPhone(element);
    	}
    	// check if required validator is present
    	if ($(element).hasClass('fixer-required')) {
    		validatorIsRequired(element);
    	}
    	// check if date validator is present
    	if ($(element).hasClass('fixer-date')) {
    		validatorIsDate(element);
    	}
    	// check if email validator is present
    	if ($(element).hasClass('fixer-email')) {
    		validatorIsEmail(element);
    	}
    	// check if either of the date range validator is present
    	if ($(element).hasClass('fixer-date-range-start') || $(element).hasClass('fixer-date-range-end')) {
    		validatorIsDateRange(element);
    	}
    }

    /**
     * process the results of the validation
     */
    function bindValidatorEvent (form) {
    	// process each of the form's input
    	form
    	.find("input.fixer, select.fixer, textarea.fixer")
    	.each(function(i, e){
    		// set the default event to onblur
    		var defaultEvent = "blur";
    		// check if the input was bound to an event
    		var customEvent = $.trim($(e).attr('fixer-event'));
    		// check if custom event is valid
    		if (customEvent.length != 0 ) {
    			defaultEvent = customEvent;
    		}
    		// bind event to set event
    		$(e)
    		.on(defaultEvent, function(){
    			// process event validator
    			processIndividualClassValidators(e);
    		});
    	});
    }

    /**
     * perform the callbacks
     * @param  {[type]} error   [description]
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    function performCallbackFunctions (error, element) {
    	// get the error callback
    	var errorCB = $.trim($(element).attr("fixer-event-cb-error"));
    	// get the success callback
    	var successCB = $.trim($(element).attr("fixer-event-cb-success"));
    	if (error === true) {
    		// if error, check if the error callback is defined, and check if entered callback is a valid function
    		if (errorCB.length !== 0  && $.isFunction(eval(errorCB))) {
	    		eval(errorCB); // execute the error CB
	    	} else {

	    	}
    	} else {
    		// if no error, check if the success callback is defined, and check if entered callback is a valid function
    		if (successCB.length !== 0 && $.isFunction(eval(successCB))) {
    			eval(successCB); // execute the success CB
    		} else {

    		}
    	}
    }

    /**
     * check if input is a valid numeric file
     * @return {[type]} [description]
     */
   	function validatorIsNumeric (element) {
   		// parse the number val
   		var numberVal = parseFloat($.trim($(element).val()), 10);
   		// set the error checker to false by default
   		var errorChecker = false;
   		// check if NaN
   		if (isNaN(numberVal)) {
   			errorChecker = true;
   		}
   		// perform callback functions
   		performCallbackFunctions(errorChecker, element);
   	}

   	/**
   	 * check if input is a valid phone value
   	 * @return {[type]} [description]
   	 */
   	function validatorIsPhone (element) {
   		console.log("check valid phone input");
   	}

   	/**
   	 * check if input is not empty
   	 * @return {[type]} [description]
   	 */
   	function validatorIsRequired (element) {
   		// get the input value
   		var inputVal = $.trim($(element).val());
   		// set the error checker to false
   		var errorChecker = false;
   		// check if the input is not empty
   		if (inputVal.length === 0) {
   			errorChecker = true;
   		}
   		// perform callback functions
   		performCallbackFunctions(errorChecker, element);
   	}

   	/**
   	 * check if input is a vali text file
   	 * @return {[type]} [description]
   	 */
   	function validatorIsText (element) {
   		// set regex for checking if string has any special characters
   		var textRegEx = "/^[a-zA-Z0-9- ]*$/";
   		// trim and cleanse the element
   		var inputText = $.trim($(element).val());
   		// set the error checker
   		var errorChecker = false;
   		if (!textRegEx.test(inputText)) {
   			errorChecker = true;
   		}
   		// perform callback functions
   		performCallbackFunctions(errorChecker, element);
   	}

   	/**
   	 * check if input is a valid email
   	 * @return {[type]} [description]
   	 */
   	function validatorIsEmail (element) {
   		// set the regex for email
   		var emailRegEx = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
   		// input element
   		var inputElement = $.trim($(element).val());
   		// error checker
   		var errorChecker = false;
   		if (!emailRegEx.test(inputElement))
		{
		   	errorChecker = true;
		}
		// perform callback functions
   		performCallbackFunctions(errorChecker, element);
   	}

   	/**
   	 * ch is a valid a date range
   	 * @return {[type]} [description]
   	 */
   	function validatorIsDate (element) {
   		// validate the entered date
   		var dateInput = moment($.trim($(element).val())).isValid();
   		var errorChecker = false;
   		// check if the date input is valid
   		if (dateInput == true) {
   			errorChecker = true;
   		}
   		// perform callback functions
   		performCallbackFunctions(errorChecker, element);
   	}

   	/**
   	 * check if a valid date range
   	 * @return {[type]} [description]
   	 */
   	function validatorIsDateRange (element) {
   		console.log("check if valid date range");
   	}
}( jQuery ));