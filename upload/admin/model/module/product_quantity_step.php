<?php
/*
* Product Quantity Step Model 
-------------------------------

Copyright 2017 Josan Iracheta

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

class ModelModuleProductQuantityStep extends Model{
	
	public function install(){
		//add column to table
		$this->db->query("ALTER TABLE ".DB_PREFIX."product ADD quantity_step int DEFAULT 1");
		//set module settings 
		$this->load->model('setting/setting');
		$this->model_setting_setting->editSetting('product_quantity_step', array('manual' => 'manual'));
	}
	
	public function uninstall(){
		//remove column from table
		$this->db->query("ALTER TABLE ".DB_PREFIX."product DROP quantity_step");
	}
	
	public function set_options(array $options){
		//set module options
		
		//save options in settings table
		$this->load->model('setting/setting');
		
		$this->model_setting_setting->editSetting('product_quantity_step',array(key($options) => $options[key($options)]));
		
		return true;
	}
	
	public function get_options(){
		//get module options
		$this->load->model('setting/setting');
		
		return $this->model_setting_setting->getSetting('product_quantity_step');
		
	}
}

?>