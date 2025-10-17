import { getApperClient } from "@/services/apperClient";
// Helper function to simulate async delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get all sellers from database
async function getAll() {
  try {
    await delay(300);
    
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error('ApperClient not initialized');
      return [];
    }

    const response = await apperClient.fetchRecords('seller_c', {
      fields: [
        { field: { Name: 'Name' } },
        { field: { Name: 'email_c' } },
        { field: { Name: 'phone_c' } },
        { field: { Name: 'description_c' } },
        { field: { Name: 'rating_c' } },
        { field: { Name: 'verified_c' } }
      ],
      orderBy: [{ fieldName: 'Id', sorttype: 'DESC' }],
      pagingInfo: { limit: 100, offset: 0 }
    });

    if (!response?.data?.length) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching sellers:', error?.response?.data?.message || error);
    return [];
  }
}

// Get seller by ID
async function getById(id) {
  try {
    await delay(300);
    
    if (!id || isNaN(parseInt(id))) {
      console.error('Invalid seller ID provided');
      return null;
    }

    const apperClient = getApperClient();
    if (!apperClient) {
      console.error('ApperClient not initialized');
      return null;
    }

    const response = await apperClient.getRecordById('seller_c', parseInt(id), {
      fields: [
        { field: { Name: 'Name' } },
        { field: { Name: 'email_c' } },
        { field: { Name: 'phone_c' } },
        { field: { Name: 'description_c' } },
        { field: { Name: 'rating_c' } },
        { field: { Name: 'verified_c' } }
      ]
    });

    return response?.data || null;
  } catch (error) {
    console.error(`Error fetching seller ${id}:`, error?.response?.data?.message || error);
    return null;
  }
}

// Create new seller(s)
async function create(sellerData) {
  try {
    await delay(300);
    
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error('ApperClient not initialized');
      return [];
    }

    const records = Array.isArray(sellerData) ? sellerData : [sellerData];
    
    const response = await apperClient.createRecord('seller_c', { records });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);

      if (failed.length > 0) {
        console.error(`Failed to create ${failed.length} sellers: ${JSON.stringify(failed)}`);
      }

      return successful.map(r => r.data);
    }

    return [];
  } catch (error) {
    console.error('Error creating sellers:', error?.response?.data?.message || error);
    return [];
  }
}

// Update existing seller
async function update(id, sellerData) {
  try {
    await delay(300);
    
    if (!id || isNaN(parseInt(id))) {
      console.error('Invalid seller ID provided');
      return null;
    }

    const apperClient = getApperClient();
    if (!apperClient) {
      console.error('ApperClient not initialized');
      return null;
    }

    const record = { Id: parseInt(id), ...sellerData };
    
    const response = await apperClient.updateRecord('seller_c', { records: [record] });

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const successful = response.results.filter(r => r.success);
      const failed = response.results.filter(r => !r.success);

      if (failed.length > 0) {
        console.error(`Failed to update seller: ${JSON.stringify(failed)}`);
        return null;
      }

      return successful[0]?.data || null;
    }

    return null;
  } catch (error) {
    console.error(`Error updating seller ${id}:`, error?.response?.data?.message || error);
    return null;
  }
}

// Delete seller
async function deleteSeller(id) {
  try {
    await delay(300);
    
    if (!id || isNaN(parseInt(id))) {
      console.error('Invalid seller ID provided');
      return false;
    }

    const apperClient = getApperClient();
    if (!apperClient) {
      console.error('ApperClient not initialized');
      return false;
    }

    const response = await apperClient.deleteRecord('seller_c', { RecordIds: [parseInt(id)] });

    if (!response.success) {
      console.error(response.message);
      return false;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);

      if (failed.length > 0) {
        console.error(`Failed to delete seller: ${JSON.stringify(failed)}`);
        return false;
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error deleting seller ${id}:`, error?.response?.data?.message || error);
    return false;
  }
}

const sellerService = {
  getAll,
  getById,
  create,
  update,
  delete: deleteSeller
};

export default sellerService;