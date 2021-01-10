/**
 * @typedef validationResponse
 * @property {string} message
 */

import authRoutes from './api/authRoutes';
import userRoutes from './api/userRoutes';
import pageRoutes from './api/pageRoutes';
import csvRoutes from './api/csvRoutes';
import placeRoutes from './api/placeRoutes';
import exploreRoutes from './api/exploreRoutes';
import tagRoutes from './api/tagRoutes';
// import unspecificRoutes from './api/unspecificRoutes';

export default function apiRoutes(app){
    app.use('/v1/api/auth', authRoutes);
    app.use('/v1/api/user', userRoutes);
    app.use('/v1/api/page', pageRoutes);
    app.use('/v1/api/csv', csvRoutes);
    app.use('/v1/api/place', placeRoutes);
    app.use('/v1/api/explore', exploreRoutes);
    app.use('/v1/api/tag', tagRoutes);

    // app.use('/v1/api', unspecificRoutes);
};
