/*
* Product Quantity Step
-----------------------------

Copyright 2017 Josan Iracheta

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

//get token from URI
var params = window.location.search;
var spl = params.split('&');
var token = spl[1].split('=')[1];

//token must be appended to url for validation

//get module settings
$(document).ready(function(){
	$.ajax({
		url: 'index.php?route=module/product_quantity_step/get&token=' + token,
		type: 'POST',
		data:{get:'get_data'}
	}).done(function(data){
		console.log(data);
		data = JSON.parse(data);
		//display module settings
		$('.step-value[data-target="' + Object.keys(data)[0] + '"]').val(data[Object.keys(data)[0]]).removeClass('hidden').prop('id','step-value');
		$('#module-settings').find('option[value="' + Object.keys(data)[0] + '"]').prop('selected','selected');
		$('p[data-type="' + Object.keys(data)[0] + '"]').removeClass('hidden');
		
	});
});

//save module settings
$('#save-module-settings').on('click',function(e){
	e.preventDefault();
	
	var moduleSetting = $('#module-settings').val(),
	stepVal = $('#step-value').val(),
	ms = {};
	ms[moduleSetting] = stepVal;

	if(!moduleSetting || !stepVal){
		return alert('Select a module setting and input a step value');
	}
	
	$.ajax({
		url: 'index.php?route=module/product_quantity_step/save&token=' + token,
		type: 'POST',
		data: {module_settings : JSON.stringify(ms)}
	}).done(function(data){
		console.log(data);
		if(data == 'true'){
			alert('Module settings were saved!');
		}
		else{
			alert('Error!');
		}
	});
});

//show respective input for selected module settings option
['change','load'].forEach(function(event){
	document.querySelector('#module-settings').addEventListener(event,function(){
		var msVal = this.value;
		var allInputs = document.querySelectorAll('.step-value');
		var allDesc = document.querySelectorAll('p[data-type]');

		allInputs.forEach(function(i){
			if(i.dataset.target == msVal){
				//show element
				i.classList.remove('hidden');
				//add ids
				i.id = 'step-value';
			}
			else{
				i.classList.add('hidden');
				i.id = '';
			}
		});
		//show description for each respective module setting option
		allDesc.forEach(function(d){
			if(d.dataset.type == msVal){
				d.classList.remove('hidden');
			}
			else{
				d.classList.add('hidden');
			}
		});
	});
});
	
	