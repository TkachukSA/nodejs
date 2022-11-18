const bd = {
    customers: [
        { name: 'Bred', id: 1 },
        { name: 'Woman', id: 2 },
        { name: 'Sister', id: 3 },
        { name: 'Brother', id: 4 },
        { name: 'front', id: 5 },
    ],
};

class CustomerRepositoryClass {
    private data = bd;

    getCustomers(name?: string) {
        if (name) {
            return this.data.customers?.filter((customer) => {
                return customer.name.indexOf(name) > -1;
            });
        } else {
            return this.data;
        }
    }

    getCustomer(id?: string) {
        return bd.customers.find((t) => t.id === Number(id));
    }

    updateCustomer(name?: string, id?: string): boolean | 'noName' {
        if (!name) {
            return 'noName';
        }

        const update = bd.customers.find((t) => t.id === Number(id));
        if (!update) {
            return false;
        }
        update.name = name;

        return true;
    }
}

export const CustomerRepository = new CustomerRepositoryClass();
