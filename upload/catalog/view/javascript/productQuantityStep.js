/*
* Product Quantity Step
* - Change product quantity by step
* - eg. Sell products in multiples of 2
--------------------------------------------
Copyright 2017 Josan Iracheta

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

//get product.tpl page's quantity and cart-btn elements
//alter their attributes
//and wrap them in a form element
//so we can take advantage of HTML5 Validation API

//price class is found in every product.tpl theme
//find price class element
//then find next adjacent element
//if it's not a div, get parent
//wrap it in a form
window.addEventListener('load',function(){
	/*
	* Possible changes: July 18, 2017
	*
	* get quantity input
	* get parent of that input
	* wrap form element around parent
	*
	*--- check other themes to see how they are setup ------*
	*/

	var cartBtn;
	if(document.querySelector('#button-cart').tagName != 'INPUT' && document.querySelector('#button-cart').tagName != 'BUTTON'){
		cartBtn = document.querySelector('#button-cart').querySelector('input');
	}
	else{
		cartBtn = document.querySelector('#button-cart');
	}
	
	//make cart btn a submit btn
	cartBtn.setAttribute('type','submit');

	var inputQty = document.querySelector('input[name="quantity"]');
	inputQty.removeAttribute('value');
	
	//find parent element that cartBtn and inputQty share in common
	var commonParent = findCommonParent(cartBtn, inputQty);
	
	//set attributes for input qty
	//min and step values will be assigned by admin user
	var qtyStep = document.querySelector('#pqs-value').value;
	var inputAttr = {'type':'number','min': qtyStep,'step':qtyStep,'required':true,'value':qtyStep};
	setAttr(inputQty,inputAttr);

	var newForm = document.createElement('form');
	newForm.id = 'pqs-form';
	
	/* Append New Form before commonParentElement First
	* THEN insert commonParentElement into New Form
	*/
	commonParent.insertAdjacentElement('beforebegin', newForm);
	document.querySelector('#pqs-form').appendChild(commonParent);

});

//prevent form from being submitted
document.body.addEventListener('submit',function(e){
	if(e.target.id == 'pqs-form'){
  	e.preventDefault();
  }
});

//set one or multiple attributes to an element
function setAttr(element,objectAttributes){
	for(attrName in objectAttributes){
  	element.setAttribute(attrName,objectAttributes[attrName]);
  }
}

function findCommonParent(el1,el2){
	var commonParent;
	//find all parent nodes for each and store them in array
	//then find lowest,matching value in both arrays
	var allParents1 = pushParentNodes(el1);
	var allParents2 = pushParentNodes(el2);
  
	for(var i = 0; i < allParents1.length; i++){
		for(var x = 0; x < allParents2.length; x++){
			if(allParents1[i] === allParents2[x]){
				return commonParent = allParents1[i];
			}
		}
	}
  
	return commonParent;
}

function pushParentNodes(node){
	var arr = [];
	while(node.parentNode){
		node = node.parentNode;
		arr.push(node);
	}
  return arr;
}