let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        let editingIndex = -1;

        // Display contacts
        function displayContacts(contactsToDisplay = contacts) {
            const container = document.getElementById('contactsContainer');
            const count = document.getElementById('contactCount');

            count.textContent = contactsToDisplay.length;

            if (contactsToDisplay.length === 0) {
                container.innerHTML = '<div class="no-contacts">No contacts found. Add one to get started!</div>';
                return;
            }

            container.innerHTML = contactsToDisplay.map((contact, index) => `
                <div class="contact-card">
                    <div class="contact-info">
                        <h3>${contact.name}</h3>
                        <p><strong>Phone:</strong> ${contact.phone}</p>
                        <p><strong>Email:</strong> ${contact.email}</p>
                        <p><strong>Address:</strong> ${contact.address}</p>
                    </div>
                    <div class="contact-actions">
                        <button class="btn-edit" onclick="editContact(${index})">Edit</button>
                        <button class="btn-delete" onclick="deleteContact(${index})">Delete</button>
                    </div>
                </div>
            `).join('');
        }

        // Add or Update Contact
        function addContact() {
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const address = document.getElementById('address').value.trim();
            // Basic validation: ensure all fields are filled
            if ([name, phone, email, address].some(field => !field)) {
                function showmessage () {
                    document.getElementById('contactsContainer');
                    
                    

                }
                return;
                
               
            }

            function Validate() {
                const email = document.getElementById('email').value.trim();
                const regex = /^([a-z A-Z \. _]+)@([a-z A-Z]+).([a-z A-Z]{2,6})/;
                if (email.trim() == "") {
                    document.write ('Please enter a valide email address!');
                } else if ((regex.test(email))){
                    document.write ('Email summited succesful')
                } else {
                    document.write ('Wrong email.address');
                }
            }

            const contact = { name, phone, email, address };

            if (editingIndex !== -1) {
                contacts[editingIndex] = contact;
                editingIndex = -1;
            } else {
                contacts.push(contact);
            }

            localStorage.setItem('contacts', JSON.stringify(contacts));
            displayContacts();
            clearForm();
        }

        // Edit Contact
        function editContact(index) {
            const contact = contacts[index];
            document.getElementById('name').value = contact.name;
            document.getElementById('phone').value = contact.phone;
            document.getElementById('email').value = contact.email;
            document.getElementById('address').value = contact.address;
            editingIndex = index;
            document.getElementById('name').focus();
        }

        // Delete Contact
        function deleteContact(index) {
            if (confirm('Are you sure you want to delete this contact?')) {
                contacts.splice(index, 1);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                displayContacts();
            }
        }

        // Clear Form
        function clearForm() {
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('email').value = '';
            document.getElementById('address').value = '';
            editingIndex = -1;
        }

        // Search Contacts
        function searchContacts() {
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const filtered = contacts.filter(contact =>
                contact.name.toLowerCase().includes(searchTerm)
            );
            displayContacts(filtered);
        }

        // Initial display
        displayContacts();



