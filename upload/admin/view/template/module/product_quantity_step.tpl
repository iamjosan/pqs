<?php echo $header; ?>
<style>
.hidden{
	display:none;
}
</style>
<div id="content">
  <div class="breadcrumb">
    <?php foreach ($breadcrumbs as $breadcrumb) { ?>
    <?php echo $breadcrumb['separator']; ?><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a>
    <?php } ?>
  </div>
  <div class="box">
    <div class="heading">
      <h1><img src="view/image/module.png" alt="" /> <?php echo $heading_title; ?></h1>
      <div class="buttons"><a class="button" id="save-module-settings"><?php echo $button_save; ?></a><a href="<?php echo $cancel; ?>" class="button"><?php echo $button_cancel; ?></a></div>
    </div><!--end heading-->
    <div class="content">
		<table class="form list">
			<thead>
				<tr>
					<td>Module Settings</td>
					<td>Step Value</td>
					<td>Setting Description</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><select id="module-settings">
							<option value="manual">Manual</option>
							<option value="data">Product Data</option>
							<option value="global">Same For All Products</option>
						</select>
					</td>
					<td><input type="number" class="step-value hidden" data-target="global"/>
						<select class="step-value hidden" data-target="data">
							<option value="quantity">Quantity</option>
							<option value="minimum">Minimum</option>
						</select>
						<input type="number" class="step-value hidden" data-target="manual" value="0" disabled/>
					</td>
					<td><p data-type="manual" class="hidden">Set the quantity-step value manually for each product in the 'Edit Product' page.</p>
						<p data-type="data" class="hidden">Set the quantity-step value to match each products' data value such as 'Minimum' or 'Quantity'.</p>
						<p data-type="global" class="hidden">Set one quantity-step value for all products.</p>
					</td>
				</tr>
			</tbody>
		</table><!--end table-->
    </div><!--end content-->
  </div>
</div>
<script src="view/javascript/productQuantityStep.js"></script>
<?php echo $footer; ?>