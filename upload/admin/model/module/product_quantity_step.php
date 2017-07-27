<?php
/*
* Product Quantity Step
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