import { Databases } from 'app/percona/shared/core';

import { InstanceTypesExtra } from '../../panel.types';

import { Messages } from './AddInstance.messages';

// Mirrors defaultSupportedServiceTypes in the server's models/service_type_allowlist.go:
// postgresql, haproxy and external are the only service types this deployment accepts.
// Offering mysql/mongodb/proxysql/valkey here would walk the user through a form that
// the server rejects at submit ("Service type %q is not supported by this deployment").
// rds stays because it is a discovery entry point for PostgreSQL on RDS.
export const instanceList = [
  { type: InstanceTypesExtra.rds, title: Messages.titles.rds },
  { type: Databases.postgresql, title: Messages.titles.postgresql },
  { type: InstanceTypesExtra.external, title: Messages.titles.external },
  { type: Databases.haproxy, title: Messages.titles.haproxy },
];
