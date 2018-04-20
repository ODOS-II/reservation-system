(function() {
	'use strict';

	// Register 'newUser' component, along with its associated controller and template
	angular.
	module('editReservation').
	component('editReservation', {
		templateUrl: 'components/administrator/edit-reservation/edit-reservation.template.html',
		controller: ['reservationService', 'userService', '$scope', '$location', '$routeParams', 'AllowedMinBookingRequestTimeHours', EditReservationController],
		controllerAs: 'editReservation'
	});

	function EditReservationController(reservationService, userService, $scope, $location, $routeParams, AllowedMinBookingRequestTimeHours) {


		$scope.findUsers = function() {
			userService.readAll(function(res, err) {
				if(res) {
					$scope.users = res;
				}
			});
		}

		$scope.findUsers();

		$scope.findRooms = function() {
			reservationService.getRooms(function (success) {
				if(success) {
					var rooms = success.data._embedded.rooms;
					$scope.rooms = rooms;
//					var roomIds = _.map(rooms ,'id');
//reservationService.getReservationsForRooms(roomIds).then( function(allReservations) {
//					$scope.rooms = $scope.filterOnlyAvailableRooms(rooms, allReservations);
//					});

				}
			});
		}

		$scope.findRooms();

		$scope.reloadRooms = () => {
			$scope.findRooms();
		}

		$scope.submit = () => {
			var starts = moment($scope.date).set($scope.startHour, 'h').set($scope.startMin, 'minutes');
			starts.set({hour: $scope.startHour, minute: $scope.startMin, second: 0, millisecond: 0});
			var ends = moment($scope.date).set($scope.endHour, 'h').set($scope.endMin, 'minutes');
			ends.set({hour: $scope.endHour, minute: $scope.endMin, second:0, millisecond: 0});
			// set post data
			var postData = {
					user: $scope.user,
					startTime: starts,
					endTime: ends,
					room: $scope.room,
					title: $scope.conferenceTitle,
					roomConfiguration: "MEETING"
			};

//			// create reservation
//			reservationService.create($scope.room, postData, function (success) {
//				// usually rebind to DOM here, but in this case, redirect back to home, which pulls calender data
//				console.log("reservation using room: " + $scope.room);
//				console.log(postData);
//				$window.location.href = '/#!/home';
//			});

		};

		$scope.getDateValidationMessage = (hour, min) => {
			if (hour && hour.$invalid && min &&  min.$invalid) return 'Please enter valid hour and minutes.';
			if (hour && hour.$invalid) return 'Please enter valid hour.';
			if (min && min.$invalid) return 'Please enter valid minutes.';
			return '';
		};


		$scope.confRequestWindowValidation = (startHr, startMin, startAmPm,  endHour, endMin, endAmPm) => {
			var start = momentFromHrMin(startHr, startMin, startAmPm);
			var end = momentFromHrMin(endHour, endMin, endAmPm);
			var duration = moment.duration(end.diff(start));
			var minutes = parseInt(duration.asMinutes());
			if (minutes > AllowedMinBookingRequestTimeHours * 60 ) return 'Conference request time exceeds minimum allowed 3 hours';
			return '';
		};

		$scope.init = function () {
			var starts = moment();
			var ends  = moment();
			$scope.startHour = Number.parseInt(starts.format('h'));
			$scope.endHour = Number.parseInt(ends.format('h'));
			$scope.endMin = $scope.startMin =  0;
			$scope.startAmPm = starts.format('A');
			$scope.endAmPm = ends.format('A');
			$scope.date = new Date();
		};
		$scope.init();
		
		function momentFromHrMin( hr, min, amPm) {
			var aMoment = moment();
			if (angular.isDefined(hr) && angular.isDefined(min)) {
				// aMoment.set(amPm && amPm === 'PM'? 12+hr : hr, 'h');
				// aMoment.set(min, 'minutes');
				aMoment.hour(amPm && amPm === 'PM'? 12+hr : hr);
				aMoment.minutes(min);
			}

			return aMoment;

		}




		$scope.reservation = {};
		if($routeParams.id) {
			reservationService.read($routeParams.id , function(response, error) {
				if(response) {
					$scope.reservation = response.data;
					$scope.reservation.startHour = new Date($scope.reservation.startTime).getHours()%12;
					$scope.reservation.startMin = new Date($scope.reservation.startTime).getMinutes();
					$scope.reservation.endHour = new Date($scope.reservation.endTime).getHours()%12;
					$scope.reservation.endMin = new Date($scope.reservation.endTime).getMinutes();
					$scope.reservation.date = new Date($scope.reservation.endTime);
				} else if(error) {
					alert('Error getting user! ');
					$location.path('/reservation/');
				}
			}); 
		} else {
			alert('No id specified!');
			$location.path('/reservation/');
		}

		$scope.update = function(user) {
			reservationService.update(id, user, function(response) {
				if(response) {
					$location.path('/reservation/');
				} else {
					alert(error);
				}
			});
		}

		$scope.cancel = function() {
			$location.path('/reservation/');
		}

	}


})();