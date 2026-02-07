// Z.ORG org chart data, matching the tree you provided.
// Structure:
// ORG
// ├─ Leadership (CEO + Board)
// └─ Business Units → Web Studio → Portfolios → Products
export const orgData = {
  name: "Z.ORG",
  title: "ORG",
  children: [
    // Leadership branch
    {
      name: "Leadership",
      title: "Unit",
      children: [
        {
          name: "Arvind",
          title: "CEO"
        },
        {
          name: "Board",
          title: "Board"
        }
      ]
    },

    // Business Units branch
    {
      name: "Business Units",
      title: "Unit",
      children: [
        {
          name: "Web Studio",
          title: "Business Unit",
          children: [
            {
              name: "Arvind",
              title: "BU Head"
            },
            {
              name: "Portfolios",
              title: "Portfolio Group",
              children: [
                // CMS portfolio
                {
                  name: "CMS",
                  title: "Portfolio",
                  children: [
                    {
                      name: "Ganesh",
                      title: "Portfolio Manager"
                    },
                    {
                      name: "Products",
                      title: "Products",
                      children: [
                        {
                          name: "SIU",
                          title: "Product",
                          children: [
                            {
                              name: "Ganesh",
                              title: "Product Manager"
                            },
                            {
                              name: "Durga",
                              title: "Developer"
                            }
                          ]
                        },
                        {
                          name: "mall360",
                          title: "Product",
                          children: [
                            {
                              name: "Ganesh",
                              title: "Product Manager"
                            },
                            {
                              name: "Developers",
                              title: "Developers",
                              children: [
                                { name: "Aravind", title: "Developer" },
                                { name: "Prasad", title: "Developer" }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

                // Web Sites portfolio
                {
                  name: "Web Sites",
                  title: "Portfolio",
                  children: [
                    {
                      name: "Ganesh",
                      title: "Portfolio Manager"
                    },
                    {
                      name: "Products",
                      title: "Products",
                      children: [
                        {
                          name: "TNS",
                          title: "Product",
                          children: [
                            {
                              name: "Ganesh",
                              title: "Product Manager"
                            },
                            {
                              name: "Bindu",
                              title: "Developer"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

                // Productivity Suite portfolio
                {
                  name: "Productivity Suite",
                  title: "Portfolio",
                  children: [
                    {
                      name: "Ganesh",
                      title: "Portfolio Manager"
                    },
                    {
                      name: "Products",
                      title: "Products",
                      children: [
                        {
                          name: "ZSLIDES",
                          title: "Product",
                          children: [
                            {
                              name: "Ganesh",
                              title: "Product Manager"
                            },
                            {
                              name: "Developers",
                              title: "Developers",
                              children: [
                                { name: "Lokesh", title: "Developer" },
                                { name: "Harshitha", title: "Developer" }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
