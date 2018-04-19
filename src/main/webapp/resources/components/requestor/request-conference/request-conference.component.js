(function () {
    'use strict';

    // Register 'requestConference' component, along with its associated controller and template
    angular.module('requestConference').component('requestConference', {
        templateUrl: 'components/requestor/request-conference/request-conference.template.html',
        controller: ['$window', 'requestConferenceService', RequestConferenceController],
        controllerAs: 'requestConf'
    });

    // Controller - data binds to view-home template
    function RequestConferenceController($window, requestConferenceService) {
        var requestConf = this;

        requestConf.submit = () => {
            // set post data
            var postData = {
                email: this.email,
                date: this.date,
                starts: this.starts,
                ends: this.ends,
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

        requestConf.init = function () {
            var starts = moment();
            var ends  = moment();
            requestConf.startHour = Number.parseInt(starts.format('h'));
            requestConf.endHour = Number.parseInt(ends.format('h'));
            requestConf.endMin = requestConf.startMin =  0;
            requestConf.startAmPm = starts.format('A');
            requestConf.endAmPM = ends.format('A');
        };
        requestConf.init();
    }
})();