<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="row">
	<div class="col-lg-12">
		<ol class="breadcrumb">
			<li><a href="${pageContext.request.contextPath}/">Home</a></li>
		</ol>
	</div>
</div>
<div class="row">
	<div class="page-header">
		<h1>
			<i class="fa fa-users"></i> Users
		</h1>
	</div>
	<div class="col-md-12">
		<div class="row">
			<div class="col-lg-offset-5 col-lg-5 col-xs-6">
				<div class="input-group">
					<input type="text" class="form-control" id="tableFilter" placeholder="Search User">
					<div class="input-group-addon">
						<span class="fa fa-search"></span>
					</div>
				</div>
			</div>
			<div class="col-lg-2 col-xs-6">
				<!-- Button trigger modal -->
				<button id="btnAddUser" type="button" class="btn btn-primary " data-toggle="modal" data-target="#newUserModal">
					<i class="fa fa-fw fa-user-plus"></i> Add New User
				</button>
			</div>
		</div>

		<div class="row" style="padding-top: 20px;">
			<div class="col-lg-12 col-xs-12">
				<table class="footable table table-bordered toggle-circle"
					id="list-users" data-page-size="12" data-filter="#tableFilter">
					<thead>
						<tr>
							<th data-hide="phone" data-type="numeric" data-sort-initial="true">#</th>
							<th>Name</th>
							<th>Last Name</th>
							<th data-hide="phone">Phone Number</th>
							<th data-hide="phone,tablet" data-sort-ignore="true">Update</th>
							<th data-hide="phone,tablet" data-sort-ignore="true">Remove</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${users}" var="user">
							<tr>
								<td>${user.id}</td>
								<td>${user.name}</td>
								<td>${user.lastName}</td>
								<td>${user.phoneNumber}</td>
								<td>
									<a href="#" type="button" class="btnEditUser btn btn-primary btn-xs" data-toggle="modal" data-target="#editUserModal"
											data-id="${user.id}" data-name="${user.name}" data-lastname="${user.lastName}" data-phone-number="${user.phoneNumber}">
										<i class="fa fa-fw fa-pencil-square-o fa-2x"></i> 
									</a> 
								</td>
								<td>
									<a href="#"  class="btnDelete btn btn-danger btn-xs" data-toggle="modal" data-target="#deleteUserModal" 
											data-id="${user.id}" data-name-lastname="${user.name} ${user.lastName}"> 
										<i class="fa fa-fw fa-user-times fa-2x"></i>
									</a>
								</td>
							</tr>
						</c:forEach>
					</tbody>
					<tfoot>
						<tr>
							<td colspan="8">
								<div class="text-center">
									<ul class="pagination hide-if-no-paging"></ul>
								</div>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
		<div class="row" style="margin-bottom: 50px;">
			<div class="col-lg-offset-5 col-xs-offset-5  col-lg-5 col-xs-2">
				<div id='loadingMoreUser' style="display: none;">
					<img src="./resources/img/spinner.gif"></img>
				</div>
			</div>
			<c:if test="${isEnough}">
				<div class="col-lg-2 col-xs-5">
					<a href="#" id="btnLoadMoreUser" class="btn btn-link"> 
						<i class="fa fa-fw fa-refresh">  Load More</i> 
					</a>
				</div>
			</c:if>
		</div>
	</div>
</div>

<!------------------------- New User Modal ------------------------------------>

<div class="modal fade" id="newUserModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">Add New User</h4>
			</div>
			<div class="modal-body">
				<form accept-charset="UTF-8" id="newUserForm" action="addUserAjax">
					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">
										<span class="glyphicon glyphicon-user"></span>
									</div>
									<input name="name" type="text" class="form-control" placeholder="Name" />
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">
										<span class="glyphicon glyphicon-user"></span>
									</div>
									<input name="lastname" type="text" class="form-control" placeholder="Last Name" />
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">
										<span class="glyphicon glyphicon-earphone"></span>
									</div>
									<input name="phoneNumber" type="text" class="phoneNumber form-control" placeholder="(___) __ __-__" />
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-offsef-2 col-lg-10">
							<div class="form-group">
								<div id="recaptcha"></div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-xs-3">
							<div id='loadingAddUser' style="display: none;">
								<img src="./resources/img/spinner.gif"></img>
							</div>
						</div>
						<div class="col-lg-offset-5 col-xs-offset-4 col-lg-4 col-xs-5">
							<button id="btn-new-user" type="submit" class="btn btn-default">Save</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<div class="col-lg-12">
					<p class="text-danger" id="newUserInfoModal"></p>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.----------------------- New User modal end ----------------------------->

<!---------------------------  Edit User Modal -------------------------------->
<div class="modal fade" id="editUserModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">Edit User</h4>
			</div>
			<div class="modal-body">
				<form accept-charset="UTF-8" id="editUserForm" action="editUserAjax">
					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">
										<span class="glyphicon glyphicon-user"></span>
									</div>
									<input id="userId" type="text" name="userId" class="form-control"/>
								</div>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">
										<span class="glyphicon glyphicon-user"></span>
									</div>
									<input id="name" name="name" type="text" class="form-control" placeholder="Name" />
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">
										<span class="glyphicon glyphicon-user"></span>
									</div>
									<input id="lastName" name="lastName" type="text" class="form-control" placeholder="Last Name" />
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-addon">
										<span class="glyphicon glyphicon-earphone"></span>
									</div>
									<input name="phoneNumber" type="text" class="phoneNumber form-control" placeholder="(___) __ __-__" />
								</div>
							</div>
						</div>
					</div>
					
					<div class="row">
						<div class="col-lg-3 col-xs-3">
							<div id='loadingEditUser' style="display: none;">
								<img src="./resources/img/spinner.gif"></img>
							</div>
						</div>
						<div class="col-lg-offset-5 col-xs-offset-4 col-lg-4 col-xs-5">
							<button id="btnUpdateUser" type="submit" class="btn btn-default">Save</button>
							<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<div class="col-lg-12">
					<p class="text-danger" id="editUserInfoModal"></p>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.----------------------  End Edit user modal  --------------------------->

<!---------------------------  Delete User Modal ------------------------------>
<div class="modal fade" id="deleteUserModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">Delete User Confirm</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-lg-12">
						<p>This user will be deleted. Are you sure?</p>
						<dl class="dl-horizontal">
							<dt>User ID</dt>
							<dd id="userId"></dd>
							<dt>Full Name</dt>
							<dd id="fullName"></dd>
						</dl>
					</div>
				</div>
				
				<div class="row">
					<div class="col-lg-3 col-xs-3">
						<div id='loadingDeleteUser' style='display: none;'>
							<div></div>
						</div>
					</div>
					<div class="col-lg-offset-5 col-xs-offset-4 col-lg-4 col-xs-5">
						<button id="btnDeleteUser" class="btn btn-default">Delete</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<div class="col-lg-12">
					<p class="text-danger" id="deleteUserInfoModal"></p>
				</div>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- /.----------------------   End Delete user modal  ------------------------>