import React, { createContext, useReducer } from 'react';
import DevicesReducer from './DevicesReducer';
import data from './json-mock-api/db.json'

const intialState = {
    data,
    searchResults: [],
    devices: {
        loading: false,
        error: null,
        data: [],
        isSearchActive: false,
        foundDevices: [],
    },
    activeRow: {
        selected: false
    },
    activeGroup: null,
    activeSGroup: null,
    searchQuery: '',
    filters: {
        onlineState: [],
        OSVersion: [],
        policyState: [],
        licenseState: [],
        deviceState: [],
    }
}

export const DevicesContext = createContext(intialState);

export const DevicesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DevicesReducer, intialState);

    function updateActiveRow(activeRow) {
        dispatch({
            type: 'UPDATE_ACTIVEROW',
            payload: activeRow
        })
    }

    function updateActiveGroup(activeGroup) {
        dispatch({
            type: 'UPDATE_ACTIVEGROUP',
            payload: activeGroup
        })
    }

    function updateActiveSubscriptionGroup(activeSGroup) {
        dispatch({
            type: 'UPDATE_ACTIVESGROUP',
            payload: activeSGroup
        })
    }

    function updateFilters(filter) {
        dispatch({
            type: 'UPDATE_FILTERS',
            payload: filter
        })
    }

    function updateSearchQuery(searchQuery) {
        dispatch({
            type: 'UPDATE_SEARCH_QUERY',
            payload: searchQuery
        })
    }

    function updateSearchResults(searchResults) {
        dispatch({
            type: 'UPDATE_SEARCH_RESULTS',
            payload: searchResults
        })
    }

    return <DevicesContext.Provider value={{
        activeRow: state.activeRow,
        filters: state.filters,
        data: state.data,
        searchQuery: state.searchQuery,
        searchResults: state.searchResults,
        activeGroup: state.activeGroup,
        activeSGroup: state.activeSGroup,
        updateActiveRow,
        updateActiveGroup,
        updateActiveSubscriptionGroup,
        updateFilters,
        updateSearchQuery,
        updateSearchResults
    }}>
        {children}
    </DevicesContext.Provider>
}