import { getApperClient } from "@/services/apperClient";

const categoryService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return [];
      }

      const response = await apperClient.fetchRecords("category_c", {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "name_c" } },
          { field: { Name: "icon_c" } },
          { field: { Name: "count_c" } },
          { field: { Name: "id_c" } }
        ]
      });

      if (!response.success) {
        console.error("Failed to fetch categories:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return null;
      }

      const response = await apperClient.fetchRecords("category_c", {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "name_c" } },
          { field: { Name: "icon_c" } },
          { field: { Name: "count_c" } },
          { field: { Name: "id_c" } }
        ],
        where: [
          {
            FieldName: "id_c",
            Operator: "EqualTo",
            Values: [id]
          }
        ]
      });

      if (!response.success) {
        console.error("Failed to fetch category:", response.message);
        return null;
      }

      return response.data?.[0] || null;
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  }
};

export default categoryService;