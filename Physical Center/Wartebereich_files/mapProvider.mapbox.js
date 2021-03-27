(function($, global) {
    'use strict';

    var initDeferred;

    var loadedImpl;

    var component = {
        init: function() {
            if (!initDeferred) {
                var mapboxJsOverride = false;
                if (window.rtCommonProps) {
                    mapboxJsOverride = rtCommonProps['common.mapbox.js.override'];
                } else {
                    mapboxJsOverride = commonProps['common.mapbox.js.override'];
                }

                initDeferred = $.Deferred();

                loadExternals(mapboxJsOverride)
                    .then(function() {
                        return loadedImpl.init();
                    })
                    .then(function() {
                        initDeferred.resolve();
                    });
            }

            return initDeferred;
        },

        cleanup: function(map, mapContainer) {
            loadedImpl.cleanup(map);
        },

        drawMap: function(args) {
            return loadedImpl.drawMap(args);
        },

        refreshSize: function(map) {
            return loadedImpl.refreshSize(map);
        },

        refreshZoom: function(map, zoom) {
            return loadedImpl.refreshZoom(map, zoom);
        },

        refreshStyle: function(map, style) {
            return loadedImpl.refreshStyle(map, style);
        },

        setCenter: function(map, loc, zoom) {
            return loadedImpl.setCenter(map, loc, zoom);
        },

        setBounds: function(map, bounds) {
            return loadedImpl.setBounds(map, bounds);
        },

        createMarker: function(map, options) {
            return loadedImpl.createMarker(map, options);
        },

        updateMarker: function(marker, loc) {
            return loadedImpl.updateMarker(marker, loc);
        },

        openPopup: function(map) {
            return loadedImpl.openPopup(map);
        },

        closePopup: function(map) {
            return loadedImpl.closePopup(map);
        },

        refreshPopup: function(map) {
            return loadedImpl.refreshPopup(map);
        }
    };

    var webGLContextAttributes = {
        failIfMajorPerformanceCaveat: true,
        antialias: false,
        alpha: true,
        stencil: true,
        depth: true
    };

    function isMapboxGlSupported(options) {
        return !!(
            isBrowser() &&
            isArraySupported() &&
            isFunctionSupported() &&
            isObjectSupported() &&
            isJSONSupported() &&
            isWorkerSupported() &&
            isUint8ClampedArraySupported() &&
            isWebGLSupportedCached()
        );
    }

    function isNotEdge() {
        return !($.browser && $.browser.msie);
    }

    function isBrowser() {
        return typeof window !== 'undefined' && typeof document !== 'undefined';
    }

    function isArraySupported() {
        return (
            Array.prototype &&
            Array.prototype.every &&
            Array.prototype.filter &&
            Array.prototype.forEach &&
            Array.prototype.indexOf &&
            Array.prototype.lastIndexOf &&
            Array.prototype.map &&
            Array.prototype.some &&
            Array.prototype.reduce &&
            Array.prototype.reduceRight &&
            Array.isArray
        );
    }

    function isFunctionSupported() {
        return Function.prototype && Function.prototype.bind;
    }

    function isObjectSupported() {
        return (
            Object.keys &&
            Object.create &&
            Object.getPrototypeOf &&
            Object.getOwnPropertyNames &&
            Object.isSealed &&
            Object.isFrozen &&
            Object.isExtensible &&
            Object.getOwnPropertyDescriptor &&
            Object.defineProperty &&
            Object.defineProperties &&
            Object.seal &&
            Object.freeze &&
            Object.preventExtensions
        );
    }

    function isJSONSupported() {
        return window['JSON'] && JSON['parse'] && JSON['stringify'];
    }

    function isWorkerSupported() {
        return window['Worker'];
    }

    // IE11 only supports `Uint8ClampedArray` as of version
    // [KB2929437](https://support.microsoft.com/en-us/kb/2929437)
    function isUint8ClampedArraySupported() {
        return window['Uint8ClampedArray'];
    }

    var isWebGLSupportedCache = {};

    function isWebGLSupportedCached() {
        if (typeof isWebGLSupportedCache.supported === 'undefined') {
            isWebGLSupportedCache.supported = isWebGLSupported();
        }

        return isWebGLSupportedCache.supported;
    }

    function isWebGLSupported() {
        var canvas = document.createElement('canvas');

        var attributes = Object.create(webGLContextAttributes);

        if (canvas.probablySupportsContext) {
            return (
                canvas.probablySupportsContext('webgl', attributes) ||
                canvas.probablySupportsContext('experimental-webgl', attributes)
            );
        }

        if (canvas.supportsContext) {
            return (
                canvas.supportsContext('webgl', attributes) || canvas.supportsContext('experimental-webgl', attributes)
            );
        }

        return canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
    }

    $.geoProviders = $.geoProviders || {};
    $.geoProviders.mapbox = $.geoProviders.mapbox || {};
    $.geoProviders.mapbox = $.extend($.geoProviders.mapbox, component);

    function loadExternals(mapboxJsOverride) {
        var CDNhost;

        if (window.rtCommonProps) {
            CDNhost = rtCommonProps['common.resources.folder'];
        } else {
            CDNhost = commonProps['common.resources.folder'];
        }

        if (!mapboxJsOverride && isNotEdge() && isMapboxGlSupported()) {
            loadedImpl = ((($ || {}).geoProviders || {}).mapbox || {}).gl;

            if (!loadedImpl) {
                return Promise.resolve(
                    $.DM.loadExternalScriptAsync(CDNhost + '/_dm/s/crossPlatform/mapProvider.mapboxgl.js')
                ).then(function() {
                    loadedImpl = $.geoProviders.mapbox.gl;
                });
            }

            return Promise.resolve(loadedImpl);
        }

        loadedImpl = ((($ || {}).geoProviders || {}).mapbox || {}).leaflet;
        if (!loadedImpl) {
            return Promise.resolve(
                $.DM.loadExternalScriptAsync(CDNhost + '/_dm/s/crossPlatform/mapProvider.mapbox.leaflet.js')
            ).then(function() {
                loadedImpl = $.geoProviders.mapbox.leaflet;
            });
        }

        return Promise.resolve(loadedImpl);
    }
})(jQuery, window);
