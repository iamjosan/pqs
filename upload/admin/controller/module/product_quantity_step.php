<?php
/*
* Product Quantity Step Controller
*/

class ControllerModuleProductQuantityStep extends Controller{
	
	public function index(){
		
		$this->language->load('module/product_quantity_step');
		$this->document->setTitle($this->language->get('heading_title'));
		$this->load->model('setting/setting');
		
		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) { // Start If: Validates and check if data is coming by save (POST) method
		
			$this->model_setting_setting->editSetting('product_quantity_step', $this->request->post);      // Parse all the coming data to Setting Model to save it in database.
			$this->session->data['success'] = $this->language->get('text_success'); // To display the success text on data save
			$this->redirect($this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL')); // Redirect to the Module Listing
		}
		
		/*Assign the language data for parsing it to view*/
		$this->data['heading_title'] = $this->language->get('heading_title');
 
		$this->data['text_enabled'] = $this->language->get('text_enabled');
		$this->data['text_disabled'] = $this->language->get('text_disabled');
		$this->data['text_content_top'] = $this->language->get('text_content_top');
		$this->data['text_content_bottom'] = $this->language->get('text_content_bottom');      
		$this->data['text_column_left'] = $this->language->get('text_column_left');
		$this->data['text_column_right'] = $this->language->get('text_column_right');
 
		$this->data['entry_code'] = $this->language->get('entry_code');
		$this->data['entry_layout'] = $this->language->get('entry_layout');
		$this->data['entry_position'] = $this->language->get('entry_position');
		$this->data['entry_status'] = $this->language->get('entry_status');
		$this->data['entry_sort_order'] = $this->language->get('entry_sort_order');
 
		$this->data['button_save'] = $this->language->get('button_save');
		$this->data['button_cancel'] = $this->language->get('button_cancel');
		$this->data['button_add_module'] = $this->language->get('button_add_module');
		$this->data['button_remove'] = $this->language->get('button_remove');
		
		/*This Block returns the warning if any*/
		if (isset($this->error['warning'])) {
			$this->data['error_warning'] = $this->error['warning'];
		} else {
			$this->data['error_warning'] = '';
		}
		/*End Block*/
 
		/*This Block returns the error code if any*/
		if (isset($this->error['code'])) {
			$this->data['error_code'] = $this->error['code'];
		} else {
			$this->data['error_code'] = '';
		}
		/*End Block*/
 
 
		/* Making of Breadcrumbs to be displayed on site*/
		$this->data['breadcrumbs'] = array();
 
		$this->data['breadcrumbs'][] = array(
			'text'      => $this->language->get('text_home'),
			'href'      => $this->url->link('common/home', 'token=' . $this->session->data['token'], 'SSL'),
			'separator' => false
		);
 
		$this->data['breadcrumbs'][] = array(
			'text'      => $this->language->get('text_module'),
			'href'      => $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL'),
			'separator' => ' :: '
		);
 
		$this->data['breadcrumbs'][] = array(
			'text'      => $this->language->get('heading_title'),
			'href'      => $this->url->link('module/product_quantity_step', 'token=' . $this->session->data['token'], 'SSL'),
			'separator' => ' :: '
		);
 
		/* End Breadcrumb Block*/
		
		$this->data['action'] = $this->url->link('module/product_quantity_step', 'token=' . $this->session->data['token'], 'SSL'); // URL to be directed when the save button is pressed
 
		$this->data['cancel'] = $this->url->link('extension/module', 'token=' . $this->session->data['token'], 'SSL'); // URL to be redirected when cancel button is pressed
 
		/* This block checks, if the hello world text field is set it parses it to view otherwise get the default hello world text field from the database and parse it*/
 
		if (isset($this->request->post['product_quantity_step_text_field'])) {
			$this->data['product_quantity_step_text_field'] = $this->request->post['product_quantity_step_text_field'];
		} else {
			$this->data['product_quantity_step_text_field'] = $this->config->get('product_quantity_step_text_field');
		}   
		/* End Block*/
		
		$this->data['modules'] = array();
 
		/* This block parses the Module Settings such as Layout, Position,Status & Order Status to the view*/
		if (isset($this->request->post['product_quantity_step_module'])) {
			$this->data['modules'] = $this->request->post['product_quantity_step_module'];
		} elseif ($this->config->get('product_quantity_step_module')) { 
			$this->data['modules'] = $this->config->get('product_quantity_step_module');
		}
		/* End Block*/         
 
		$this->load->model('design/layout'); // Loading the Design Layout Models
 
		$this->data['layouts'] = $this->model_design_layout->getLayouts(); // Getting all the Layouts available on system
 
		$this->template = 'module/product_quantity_step.tpl'; // Loading the helloworld.tpl template
		$this->children = array(
			'common/header',
			'common/footer'
		);  // Adding children to our default template i.e., helloworld.tpl 
 
		$this->response->setOutput($this->render()); // Rendering the Output
	}
	
	public function install(){
		
		$this->load->model('module/product_quantity_step');
		$this->model_module_product_quantity_step->install();
		
	}
	
	public function uninstall(){
		
		$this->load->model('module/product_quantity_step');
		$this->model_module_product_quantity_step->uninstall();
		
	}
	
	public function get(){
		
		$this->load->model('module/product_quantity_step');
		
		//get module settings
		$settings = $this->model_module_product_quantity_step->get_options();
		
		$this->response->setOutput(json_encode($settings));
	}
	
	public function save(){
		
		$this->load->model('module/product_quantity_step');
		$ms = $this->request->post['module_settings'];
		//replace html with quotes
		$module_settings = str_replace('&quot;','"',$ms);
		//var_dump($module_settings);
		$save = $this->model_module_product_quantity_step->set_options(json_decode($module_settings,true));
		
		$this->response->setOutput(json_encode($save));
		
	}
	
	/* Function that validates the data when Save Button is pressed */
    protected function validate() {
 
        /* Block to check the user permission to manipulate the module*/
        if (!$this->user->hasPermission('modify', 'module/helloworld')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }
        /* End Block*/
 
        /* Block to check if the helloworld_text_field is properly set to save into database, otherwise the error is returned*/
        if (!$this->request->post['helloworld_text_field']) {
            $this->error['code'] = $this->language->get('error_code');
        }
        /* End Block*/
 
        /*Block returns true if no error is found, else false if any error detected*/
        if (!$this->error) {
            return true;
        } else {
            return false;
        }   
        /* End Block*/
    }
    /* End Validation Function*/
}
?>