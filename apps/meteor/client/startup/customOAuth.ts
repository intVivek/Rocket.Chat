import type { ILoginServiceConfiguration, OAuthConfiguration } from '@rocket.chat/core-typings';
import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

import { CustomOAuth } from '../../app/custom-oauth/client/CustomOAuth';

Meteor.startup(() => {
	ServiceConfiguration.configurations
		.find({
			custom: true,
		})
		.observe({
			async added(record) {
				const service = record as unknown as (ILoginServiceConfiguration & OAuthConfiguration) | undefined;

				if (!service) {
					return;
				}

				new CustomOAuth(service.service, {
					serverURL: service.serverURL,
					authorizePath: service.authorizePath,
					scope: service.scope,
				});
			},
		});
});
