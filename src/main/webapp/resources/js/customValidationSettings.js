$(document).ready(function() {
	/******************** New user form validation ****************************************************/
	$('#newUserForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your name'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9ğüşöçıİĞÜŞÖÇ\s]+$/,
                        message: 'The name can consist of alphabetical characters and spaces only'
                    }
                }
            },
            lastname: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your last name'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9ğüşöçıİĞÜŞÖÇ\s]+$/,
                        message: 'The last name can consist of alphabetical characters and spaces only'
                    }
                }
            }, 
            phoneNumber: {
                validators: {
                    notEmpty: {
                        message: 'Please enter a valid phone number'
                    },
                    regexp:{
                    	regexp: /[(]\d{3}[)]\s\d{3}-\d{4}/,
                    	message: 'The Phone Number can consist of numbers'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) { // added user to database with ajax after form validation success
        // Prevent form submission
        e.preventDefault();

        var $form        = $(e.target),
            validator    = $form.data('bootstrapValidator'),
            submitButton = validator.getSubmitButton();
        
        submitButton.prop("disabled",false);
        
        var formData = {};
   		$('#newUserForm').serializeArray().map(function(item) {
   		    formData[item.name] = item.value;
   		}); // form inputs convert to json data  
   		
   		// begin newUserForm ajax //
   		$.ajax({
   			headers: { 
   		        Accept : "application/json; charset=utf-8",
   		        "Content-Type": "application/json; charset=utf-8"
   		    },
   			url : $form.attr("action"),
   			type: 'post',
   			dataType:'json',
   			contentType : 'application/json; charset=UTF-8',
   			data: JSON.stringify(formData),
   			beforeSend: function(){
   				$('#loadingAddUser').show();
   			},
   			success: function(response){
   					if(response.valid == true){
   						var user = response.user;
   						//get the footable object
   					    var footable = $('table').data('footable');
   					    //build up the row we are wanting to add
   					    var newRow = '<tr>'
					    			  	+'<td>'+user.id+'</td>'
						    			+'<td>'+user.name+'</td>'
						    			+'<td>'+user.lastName+'</td>'
						    			+'<td>'+user.phoneNumber+'</td>'
						    			+'<td>'
							    			+'<a href="#" type="button" class="btnEditUser btn btn-primary btn-xs" data-toggle="modal" data-target="#editUserModal"'
												+'data-id="' + user.id + '" data-name="'+ user.name +'" data-lastname="'+ user.lastName+'" data-phone-number="'+ user.phoneNumber +'">'
											+'<i class="fa fa-pencil-square-o fa-fw  fa-2x"></i>'
											+'</a>' 
						    			+'</td>'
						    			+'<td>'
							    			+'<a href="#" type="button" class="btnDelete btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteUserModal"'
											+'data-id="' + user.id + '" data-name-lastname="'+user.name+' '+user.lastName+'">'
												+'<i class="fa fa-fw fa-user-times fa-2x"></i>'
											+'</a>' 
						    			+'</td>'
					    			+'</tr>';
   					    //add it
   					    footable.appendRow(newRow);
   					    // hide modal
   					    $('#newUserModal').modal('hide');
   					    
   					    // form reset after adding user
   						$form.bootstrapValidator('resetForm', true);
   					    
   					    // notification info
   					    $.growl({
	 						icon: "glyphicon glyphicon-info-sign",
	 						title: "<strong> Info : </strong> ",
	 						message: "User added successfully.",
	 					},{
	 						type: "info",
	 						animate:{enter:'zoomInRight animated',exit:'zoomOutRight animated'}
	 					});
   					    
   					}else if(response.reCaptchaValid == false){
   						$('#newUserInfoModal').text("The captcha is not valid.");
   						// refresh reCaptcha
   						reloadRecaptcha();
   					}else{
   						$('#newUserInfoModal').text(response.message);
   						// refresh reCaptcha
   						reloadRecaptcha();
   					}
   					
   			},
   			complete:function(){
   				$('#loadingAddUser').hide();
			}
   		});
   		// end newUserForm ajax //
   		return false;
    });
	/****************** End New user form validation ****************************************************/
	
	/****************** Find old user row **************************************************************/
	var oldTableRow = null;
	$('#list-users').on('click', '.btnEditUser', function(){
	    oldTableRow = $(this).closest('tr');
	});
	/****************** End Find old user row **********************************************************/
		
	
	/****************** Edit user form validation *******************************************************/
	$('#editUserForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your name'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9ğüşöçıİĞÜŞÖÇ\s]+$/,
                        message: 'The name can consist of alphabetical characters and spaces only'
                    }
                }
            },
            lastName: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your last name'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9ğüşöçıİĞÜŞÖÇ\s]+$/,
                        message: 'The last name can consist of alphabetical characters and spaces only'
                    }
                }
            }, 
            phoneNumber: {
                validators: {
                    notEmpty: {
                        message: 'Please enter a valid phone number'
                    },
                    regexp:{
                    	regexp: /[(]\d{3}[)]\s\d{3}-\d{4}/,
                    	message: 'The Phone Number can consist of numbers'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {// saved user to database with ajax after form validation success
        // Prevent form submission
        e.preventDefault();
       
        var $form        = $(e.target),
            validator    = $form.data('bootstrapValidator'),
            submitButton = validator.getSubmitButton();
        
        var formData = {};
        formData["userId"] = $("#editUserModal #userId").val();
        formData["name"] = $("#editUserModal #name").val();
   		formData["lastName"] = $("#editUserModal #lastName").val();
   		formData["phoneNumber"] = $("#editUserModal .phoneNumber").val();
   		
   		// begin edit user ajax //
   		$.ajax({
   			headers: { 
   		        Accept : "application/json; charset=utf-8",
   		        "Content-Type": "application/json; charset=utf-8"
   		    },
   			url : $form.attr("action"),
   			type: 'post',
   			dataType:'json',
   			contentType : 'application/json; charset=UTF-8',
   			data: JSON.stringify(formData),
   			beforeSend: function(){
   				$('#loadingEditUser').show();
   			},
   			success: function(response){
   					if(response.valid == true){
   						var user = response.user;
   						//get the footable object
   					    var footable = $('table').data('footable');
   					    //build up the row we are wanting to add
   					    var newRow = '<tr>'
   					    			  	+'<td>'+user.id+'</td>'
	   					    			+'<td>'+user.name+'</td>'
	   					    			+'<td>'+user.lastName+'</td>'
	   					    			+'<td>'+user.phoneNumber+'</td>'
	   					    			+'<td>'
		   					    			+'<a href="#" type="button" class="btnEditUser btn btn-primary btn-xs" data-toggle="modal" data-target="#editUserModal"'
												+'data-id="' + user.id + '" data-name="'+ user.name +'" data-lastname="'+ user.lastName+'" data-phone-number="'+ user.phoneNumber +'">'
											+'<i class="fa fa-pencil-square-o fa-fw  fa-2x"></i>'
											+'</a>' 
	   					    			+'</td>'
	   					    			+'<td>'
		   					    			+'<a href="#" type="button" class="btnDelete btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteUserModal"'
		   					    			+'data-id="' + user.id + '" data-name-lastname="'+user.name+' '+user.lastName+'">'
												+'<i class="fa fa-fw fa-user-times fa-2x"></i>'
											+'</a>' 
	   					    			+'</td>'
   					    			+'</tr>';

   					    //remove old row
   					    footable.removeRow(oldTableRow);
   					    //add new row
   					    footable.appendRow(newRow);
   					    
   					    // form reset after adding user
   						$form.bootstrapValidator('resetForm', true);
   						
   					    // hide modal
   					    $('#editUserModal').modal('hide');
	   					
   					    // notification settings 
   					    $.growl({
	 						icon: "glyphicon glyphicon-info-sign",
	 						title: "<strong> Info : </strong> ",
	 						message: "User update successfully.",
	 					},{
	 						type: "info",
	 						animate:{enter:'zoomInRight animated',exit:'zoomOutRight animated'}
	 					});
   					}else{
   						$('#editUserInfoModal').text("User update unsuccessfully.");
   					}
   			},
   			complete:function(){
   				$('#loadingEditUser').hide(); 
			}
   		});
   		// end edit user ajax //
   		return false;
    });
	/****************** End Edit user form validation **************************************************/
	
	/****************** ReCaptcha validation ***********************************************************/
	// Initialization reCaptcha
	$('#btnAddUser').on('click',function(e){
		e.preventDefault();
		reloadRecaptcha();
	});
	
	function reloadRecaptcha() {
		var publicKey = "6LehUwcTAAAAAGhTkTgRDlYnpM8iO7SUaIzH3fwZ";
		var div = "recaptcha";
		Recaptcha.create(publicKey, div, {
			theme 	 : "clean",
		});
		return false;
	}
	/****************** End ReCaptcha validation *******************************************************/
});