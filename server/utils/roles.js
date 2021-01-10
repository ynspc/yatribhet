/**
 * shopkeeper
 * institution
 * admin
 * superAdmin
 */

import { AccessControl } from 'accesscontrol';

import { enums } from '../helpers/constants/database';

const Acl = new AccessControl();

Acl.grant( enums.userRoles['shopkeeper'])
    .readOwn(['profile'])
    .updateOwn(['profile']);

export default Acl;
