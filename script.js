<script>
    jQuery('input[name="form_fields[name]"]').on('change',function(){
        if(jQuery(this).is(':checked')){
            jQuery('input[name="form_fields[name]"]').removeClass("selected");
            jQuery(this).addClass("selected");}
        let cat_dog_val = jQuery('input[name="form_fields[name]"]:checked').val();
        let cat_or_dog = cat_dog_val.split('ביטוח')[1];
        jQuery(".elementor-field-group-pet_name label").html("שם "+ cat_or_dog);  
    
    });
        
        
        
    function is_israeli_id_number(id) {
    	id = String(id).trim();
    	if (id.length > 9 || isNaN(id)) return false;
    	id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    		return Array.from(id, Number).reduce((counter, digit, i) => {
    			const step = digit * ((i % 2) + 1);
    			return counter + (step > 9 ? step - 9 : step);
    		}) % 10 === 0;
    }
    
    // Validate user_id
    
    jQuery('input[name="form_fields[user_id]"]').on('change', function(){
        let id = jQuery(this).val();
        let is_valid_id = is_israeli_id_number(id);
        console.log(is_valid_id);
        if(!is_valid_id){
           jQuery(this).css("border", "1px solid red");
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
            if(jQuery("#id_alert").length > 0){jQuery("#id_alert").show();}else{jQuery(".elementor-field-group-user_id ").append("<span class='elementor_alert' id='id_alert'>מספר תעודת הזהות שלכם לא תקין נסו שוב.</span>");
            }
        }else{
            jQuery(this).css("border", "1px solid #69727d");
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
            jQuery("#id_alert").hide();
            
        }
    });
    
    // Validate phone
    
    jQuery('input[name="form_fields[phone]"]').on('change', function(){
        let phone = jQuery(this).val();
        let regex = /^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/;
        let result = regex.test(phone);
        if(!result){
           jQuery(this).css("border", "1px solid red");
           jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
           if(jQuery("#phone_alert").length > 0){
               jQuery("#phone_alert").show();}else{
                   jQuery(".elementor-field-group-phone ").append("<span class='elementor_alert' id='phone_alert'>מספר הטלפון שלך שגוי, אנא בדוק שוב</span>");}
                   }else{
            jQuery(this).css("border", "1px solid #69727d");
            jQuery("#phone_alert").hide();
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
        }
        
    });
    
    // Add pet name to form
        jQuery('input[name="form_fields[pet_name]"]').on('change', function(){
        let pet_name = jQuery(this).val();
        if(pet_name){
            jQuery(".title_with_pet_name").html("נשמח להכיר את"+" "+pet_name);
            jQuery(".elementor-field-group-pet_gender > label").html("מה מינו של"+" "+pet_name+"?");
             jQuery('.elementor-field-group-race > label').html("מה הגזע של" + " "+pet_name+"?");
             jQuery('.elementor-field-group-is_healthy > label').html("האם" + " "+pet_name+" "+"בריא"+"?");
             
        }
        
    });
    
    // Mantadory race
    jQuery('input[name="form_fields[mixed_race]"]').on('change', function(){
        let mixed_race = jQuery(this).val();
        if(mixed_race == "גזעי/ת"){ 
           jQuery('input[name="form_fields[race]"]').attr("required", "required") 
        }else{ 
           jQuery('input[name="form_fields[race]"]').removeAttr("required"); 
        }
    });
    
    
    
    // Check if date as least 4 month ago
    
function fourMonthsPrior(date) {
  // Copy date so don't affect original
  var d = new Date(date);
  // Get the current month number
  var m = d.getMonth();
  // Subtract 6 months
  d.setMonth(d.getMonth() - 4);
  // If the new month number isn't m - 6, set to last day of previous month
  // Allow for cases where m < 6
  var diff = (m + 12 - d.getMonth()) % 12;
  if (diff < 4) d.setDate(0)
  
  return d;
}

// Open popup function
function openElementorPopup(){
	elementorProFrontend.modules.popup.showPopup( { id: 471 } );
	// if we click on edit information button
jQuery('.e-con .elementor-widget.elementor-widget.close_button .elementor-button').on('click', function(e){
	e.preventDefault();
	 jQuery('.elementor-popup-modal .dialog-close-button').click();
 });
}

// Helper to format the date
function formatDate(d) {
  return d.toLocaleDateString('en-CA');
}
    
        jQuery('input[name="form_fields[date_of_birth]"]').on('change', function(){
        let date_of_birth = jQuery(this).val();
        let current_date = new Date(Date.now());
        let is_valid_date = date_of_birth <= formatDate(fourMonthsPrior(current_date));
        if(!is_valid_date){
           jQuery(this).css("border", "1px solid red");
			openElementorPopup();
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
            if(jQuery("#date_of_birth_alert").length > 0){jQuery("#date_of_birth_alert").show();}else{jQuery(".elementor-field-group-date_of_birth ").append("<span class='elementor_alert' id='date_of_birth_alert'>מצטערים, אנו מקבלים רק חיות מחמד מגיל 4 חודשים</span>");
            }
        }else{
            jQuery(this).css("border", "1px solid #69727d");
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
            jQuery("#date_of_birth_alert").hide();
        }
    });
    
    // Don't accept not healthy
        jQuery('input[name="form_fields[is_healthy]"]').on('change', function(){  
            let is_healthy = jQuery(this).val();
            if(is_healthy == 'לא'){
			openElementorPopup();
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
            if(jQuery("#is_healthy_alert").length > 0){jQuery("#is_healthy_alert").show();}else{jQuery(".elementor-field-group-is_healthy ").append("<span class='elementor_alert' id='is_healthy_alert'> מצטערים, אנו מקבלים רק חיות מחמד בריאות </span>");
            } 
            }else{
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
            jQuery("#is_healthy_alert").hide();
            }
            
        });
        

        
    // Don't accept without vaccinations
        jQuery('input[name="form_fields[vaccinations]"]').on('change', function(){  
            let vaccinations = jQuery(this).val();
            if(vaccinations == 'לא'){
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
            if(jQuery("#vaccinations").length > 0){jQuery("#vaccinations").show();}else{jQuery(".elementor-field-group-vaccinations ").append("<span class='elementor_alert' id='vaccinations'> מצטערים, אנו מקבלים רק חיות מחמד עם חיסונים רגילים </span>");
            } 
            }else{
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
            jQuery("#vaccinations").hide();
            }
            
        });
        
      // Don't accept with surgery
        jQuery('input[name="form_fields[surgery]"]').on('change', function(){  
            let surgery = jQuery(this).val();
            if(surgery == 'כן'){
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
            if(jQuery("#surgery").length > 0){jQuery("#surgery").show();}else{jQuery(".elementor-field-group-surgery").append("<span class='elementor_alert' id='surgery'> מצטערים, אנו מקבלים רק חיות מחמד שעברו ניתוח </span>");
            } 
            }else{
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
            jQuery("#surgery").hide();
            }
            
        });
        
        
              // Don't accept with health problems
        jQuery('input[name="form_fields[health_problems]"]').on('change', function(){  
            let health_problems = jQuery(this).val();
            if(health_problems == 'כן'){
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
            if(jQuery("#health_problems").length > 0){jQuery("#health_problems").show();}else{jQuery(".elementor-field-group-health_problems").append("<span class='elementor_alert' id='health_problems'>מצטערים, אנו מקבלים רק חיות מחמד ללא בעיות בריאותיות</span>");
            } 
            }else{
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
            jQuery("#health_problems").hide();
            }
            
        });
        
                      // Don't accept with accident 
        jQuery('input[name="form_fields[accident]"]').on('change', function(){  
            let accident = jQuery(this).val();
            if(accident == 'כן'){
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
            if(jQuery("#accident").length > 0){jQuery("#accident").show();}else{jQuery(".elementor-field-group-accident ").append("<span class='elementor_alert' id='accident'> מצטערים שאנחנו לא יכולים לקבל חיית מחמד עם התאונה </span>");
            } 
            }else{
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
            jQuery("#accident").hide();
            }
            
        });
        
       // Don't accept with medical treatment 
        jQuery('input[name="form_fields[medical_treatment]"]').on('change', function(){  
            let medical_treatment = jQuery(this).val();
            if(medical_treatment == 'כן'){
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
            if(jQuery("#medical_treatment").length > 0){jQuery("#accident").show();}else{jQuery(".elementor-field-group-medical_treatment ").append("<span class='elementor_alert' id='medical_treatment'> מצטערים, אנו מקבלים רק חיות מחמד שקיבלו טיפול רפואי </span>");
            } 
            }else{
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
            jQuery("#medical_treatment").hide();
            }
            
        });
        
               // Don't accept with medical problems 
        jQuery('input[name="form_fields[medical_problem]"]').on('change', function(){  
            let medical_problem = jQuery(this).val();
            if(medical_problem == 'כן'){
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
            if(jQuery("#medical_problem").length > 0){jQuery("#accident").show();}else{jQuery(".elementor-field-group-medical_problem ").append("<span class='elementor_alert' id='medical_problem'>  מצטערים, אנו מקבלים רק חיות מחמד בריאות </span>");
            } 
            }else{
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
            jQuery("#medical_problem").hide();
            }
            
        });
        
   
        
        // If had insurance before
    jQuery('input[name="form_fields[had_insurance]"]').on('change', function(){
        let had_insurance = jQuery(this).val();
		console.log(had_insurance);
        if(had_insurance == 'כן'){ 
           jQuery('input[name="form_fields[insurance_company]"]').attr("required", "required");
		   jQuery(".elementor-field-group-insurance_company").show();
        }else{ 
           jQuery('input[name="form_fields[insurance_company]"]').removeAttr("required"); 
			jQuery(".elementor-field-group-insurance_company").hide();
        }
    });

        // If has declined insurance before
    jQuery('input[name="form_fields[declined_insurance]"]').on('change', function(){
        let declined_insurance = jQuery(this).val();
        if(declined_insurance == 'כן'){
			openElementorPopup();
            jQuery(".elementor-element .e-form__buttons__wrapper__button-next").addClass("disabled");
				if(jQuery("#declined_insurance").length > 0){jQuery("#declined_insurance").show();}else{jQuery(".elementor-field-group-declined_insurance ").append("<span class='elementor_alert' id='declined_insurance'> אנא מלא חלון קופץ כדי ליצור איתנו קשר </span>");
            } 
            }else{
				jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
				jQuery("#declined_insurance").hide();
            }
    });

// If we go back enable next button
 jQuery('.elementor-widget-form .e-form__buttons__wrapper__button-previous').on('click', function(){
	 jQuery(".elementor-element .e-form__buttons__wrapper__button-next").removeClass("disabled");
 });


// Change calendar days to He
	jQuery('input[name="form_fields[date_of_birth]"]').on('focus', function(){
		if(jQuery(".flatpickr-weekdays .flatpickr-weekday:contains(Sun)").length > 0){
			jQuery(".flatpickr-weekdays .flatpickr-weekday:contains(Sun)").html("ראשון");
			jQuery(".flatpickr-weekdays .flatpickr-weekday:contains(Mon)").html("שני");
			jQuery(".flatpickr-weekdays .flatpickr-weekday:contains(Tue)").html("שלישי");
			jQuery(".flatpickr-weekdays .flatpickr-weekday:contains(Wed)").html("רביעי");
			jQuery(".flatpickr-weekdays .flatpickr-weekday:contains(Thu)").html("חמישי");
			jQuery(".flatpickr-weekdays .flatpickr-weekday:contains(Fri)").html("שישי");
			jQuery(".flatpickr-weekdays .flatpickr-weekday:contains(Sat)").html("שבת");
		}
	});
</script>
