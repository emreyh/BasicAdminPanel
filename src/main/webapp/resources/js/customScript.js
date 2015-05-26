$(document).ready( function() {
	// footable
	$('#list-users').footable();
	
	// phone number masking
	$('.phoneNumber').mask('(000) 000-0000');
	
	
	/*******************  Begin Ajax - Load More User via Ajax *****************************************/
	$('#btnLoadMoreUser').click(function(e) {
		e.preventDefault();
		$.ajax({
   			headers: { 
   		        Accept : "application/json; charset=utf-8",
   		        "Content-Type": "application/json; charset=utf-8"
   		    },
   			url : 'getUsersAjaxByPageNumber',
   			type: 'POST',
   			dataType:'json',
   			contentType : 'application/json; charset=UTF-8',
   			beforeSend: function(){
   				$('#loadingMoreUser').show();
   			},
   			success: function(response){
				if(response.isExist == true){
					//get the footable object
				    var footable = $('table').data('footable');
				    
				    var newRow;
				    $.each(response.users, function(i,user){
				    	newRow =
				    		'<tr>'
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
					    			+'<a href="#" type="button" class="btnDelete btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteUserModal" '
					    			+'data-id="' + user.id + '" data-name-lastname="'+user.name+' '+user.lastName+'">'
										+'<i class="fa fa-fw fa-user-times fa-2x"></i>'
									+'</a>' 
				    			+'</td>'
			    			+'</tr>';
				    	//add it
					    footable.appendRow(newRow);
				    });
   				}else {
   					$('#btnLoadMoreUser').attr("disabled",true); // there isn't another user
   					
	   				// notification settings -- growl plugin
				    $.growl({
						icon: "glyphicon glyphicon-info-sign",
						title: "<strong> Info : </strong> ",
						message: "No another user.",
				    },{
				    	type: "info",
				    	animate:{enter:'zoomInRight animated',exit:'zoomOutRight animated'}
				    });
   				}
   			},
   			complete:function(){
   				$('#loadingMoreUser').hide();
			}
   		});
	});
	/*******************  End Ajax - Load More User via Ajax *******************************************/
	
	/****************** Find deleted user row **********************************************************/
	var deletedUserRow = null;
	$('#list-users').on('click', '.btnDelete', function(){
		deletedUserRow = $(this).closest('tr');
	});
	/****************** End Find deleted user row ******************************************************/
	
	/*******************  Begin Ajax - Delete User via Ajax ********************************************/
	$('#btnDeleteUser').click(function(e) {
		e.preventDefault();
		var userId = $('#deleteUserModal #userId').text();

		$.ajax({
   			headers: { 
   		        Accept : "application/json; charset=utf-8",
   		        "Content-Type": "application/json; charset=utf-8"
   		    },
   			url : 'deleteUserAjax',
   			type: 'POST',
   			dataType:'json',
   			data: JSON.stringify({"userId" : userId}),
   			contentType : 'application/json; charset=UTF-8',
   			beforeSend: function(){
   				$('#loadingDeleteUser').show();
   			},
   			success: function(response){
				if(response.valid == true){
					//get the footable object
				    var footable = $('table').data('footable');
				    footable.removeRow(deletedUserRow);
   				}else {
	   				// notification settings -- growl plugin
				    $.growl({
						icon: "glyphicon glyphicon-info-sign",
						title: "<strong> Info : </strong> ",
						message: "User couldn't delete.",
				    },{
				    	type: "info",
				    	animate:{enter:'zoomInRight animated',exit:'zoomOutRight animated'}
				    });
   				}
				$("#deleteUserModal").modal('hide');
   			},
   			complete:function(){
				$('#loadingDeleteUser').hide();
			}
   		});
	});	
	
	/*******************  End Ajax - Delete User via Ajax **********************************************/
	
	// editUserModal show event 
	$("#editUserModal").on('show.bs.modal',function(e){
		var userId = $(this).find('#userId');
		userId.val($(e.relatedTarget).data('id'));
		userId.prop("disabled",true);
		
		$(this).find('#name').val($(e.relatedTarget).data('name'));
		$(this).find('#lastName').val($(e.relatedTarget).data('lastname'));
		$(this).find('.phoneNumber').val($(e.relatedTarget).data('phone-number'));
	});
	
	// new user form reset
	$('#newUserModal').on('show.bs.modal', function(){
		$('#newUserInfoModal').text("");
	});
	
	// delete user modal show event
	$("#deleteUserModal").on('show.bs.modal',function(e){
		$(this).find('#userId').text($(e.relatedTarget).data('id'));
		$(this).find('#fullName').text($(e.relatedTarget).data('name-lastname'));
	});
});