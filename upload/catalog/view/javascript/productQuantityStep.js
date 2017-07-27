/*
* Product Quantity Step
* - Change product quantity by step
* - eg. Sell products in multiples of 2
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
	if(document.querySelector('#button-cart').tagName != 'INPUT'){
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
	document.querySelector('#pqs-form').append(commonParent);

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