(function () {
    'use strict';

    // Register 'requestConference' component, along with its associated controller and template
    angular.module('requestConference').component('requestConference', {
        templateUrl: 'components/requestor/request-conference/request-conference.template.html',
        controller: ['$window', 'requestConferenceService', 'AllowedMinBookingRequestTimeHours', RequestConferenceController],
        controllerAs: 'requestConf'
    });

    // Controller - data binds to view-home template
    function RequestConferenceController($window, requestConferenceService, AllowedMinBookingRequestTimeHours) {
        var requestConf = this;


        requestConf.submit = () => {
            var starts = moment(requestConf.date).set(requestConf.startHour, 'h').set(requestConf.startMin, 'minutes');
            var ends = moment(requestConf.date).set(requestConf.endHour, 'h').set(requestConf.endMin, 'minutes');
            // set post data
            var postData = {
                email: this.email,
                date: this.date,
                starts: starts,
                ends: ends,
                buildingPref: this.buildingPref,
                conferenceTitle: this.conferenceTitle,
                conferenceDetails: this.conferenceDetails,
                invites: this.invites
            };
            // create conference
            requestConferenceService.createConference(postData, function (success) {
                // usually rebind to DOM here, but in this case, redirect back to home, which pulls calender data
                $window.location.href = '/#!/home';
            });
        }

        requestConf.getDateValidationMessage = (hour, min) => {
            if (hour && hour.$invalid && min &&  min.$invalid) return 'Please enter valid hour and minutes.';
            if (hour && hour.$invalid) return 'Please enter valid hour.';
            if (min && min.$invalid) return 'Please enter valid minutes.';
            return '';
        };


        requestConf.confRequestWindowValidation = (startHr, startMin, endHour, endMin) => {
            var start = momentFromHrMin(startHr, startMin);
            var end = momentFromHrMin(endHour, endMin);
            var duration = moment.duration(end.diff(start));
            var minutes = parseInt(duration.asMinutes());
            if (minutes > AllowedMinBookingRequestTimeHours * 60 ) return 'Conference request time exceeds minimum allowed 3 hours';
            return '';
        };

        requestConf.init = function () {
            var starts = moment();
            var ends  = moment();
            requestConf.startHour = Number.parseInt(starts.format('h'));
            requestConf.endHour = Number.parseInt(ends.format('h'));
            requestConf.endMin = requestConf.startMin =  0;
            requestConf.startAmPm = starts.format('A');
            requestConf.endAmPM = ends.format('A');
            requestConf.date = new Date();
        };
        requestConf.init();
    }

    function momentFromHrMin( hr, min) {
        return moment().hour(hr).minutes(min);
    }
})();