export const filterData = (filters,data) => {
    let filteredData = data.filter((v) => {
        let OSVersion = null;
        if (filters['OSVersion'].length) {
          filters['OSVersion'].map((v1) => {
            if (v1 === v.osversion) {
              OSVersion = true;
            } else if (OSVersion !== true) {
              OSVersion = false;
            }
            return false;
          });
        }

        let onlineState = null;
        if (filters['onlineState'].length) {
          filters['onlineState'].map((v1) => {
            if (v.online === true && v1 === 'online') {
              onlineState = true;
            } else if (v.online === false && v1 === 'offline') {
              onlineState = true;
            } else if (onlineState !== true) {
              onlineState = false;
            }
            return false;
          });
        }

        let deviceState = null;
        if (filters['deviceState'].length) {
          filters['deviceState'].map((v1) => {
            if (v.model === v1) {
              deviceState = true;
            } else if (
              v1 === 'others' &&
              v.model !== 'Raspberry Pi 3'
            ) {
              deviceState = true;
            } else if (deviceState !== true) {
              deviceState = false;
            }
            return false;
          });
        }

        let policyState = null;
        if (filters['policyState'].length) {
          filters['policyState'].map((v1) => {
            if (v.policy === v1) {
              policyState = true;
            } else if (
              v1 === 'notApplied' &&
              v.policy !== 'applied'
            ) {
              policyState = true;
            } else if (policyState !== true) {
              policyState = false;
            }
            return false;
          });
        }

        let licenseState = null;
        if (filters['licenseState'].length) {
          filters['licenseState'].map((v1) => {
            if (v1 === v.license) {
              licenseState = true;
            } else if (licenseState !== true) {
              licenseState = false;
            }
            return false;
          });
        }

        let filtered =
          OSVersion ||
          onlineState ||
          deviceState ||
          policyState ||
          licenseState;

        if (
          OSVersion === null &&
          onlineState === null &&
          deviceState == null &&
          policyState == null &&
          licenseState == null
        ) {
          filtered = true;
        }

        return filtered;
      });

      return filteredData;
}