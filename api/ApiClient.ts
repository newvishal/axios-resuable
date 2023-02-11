import { API } from '../config/helpers/axios';

const DEFAULT_API_VERSION = 'v1';
console.log('ok');
class ApiClient<T> {
  apiVersion: string;
  options: any;
  resource: string;
  constructor(resource, options: any = {}) {
    this.apiVersion = `/api/${options.apiVersion || DEFAULT_API_VERSION}`;
    this.options = options;
    this.resource = resource;
  }

  get url() {
    return `${this.apiVersion}/${this.resource}`;
  }

  get() {
    return API.get(this.url);
  }

  show(id: number) {
    return API.get(`${this.url}/${id}`);
  }

  create(data: T) {
    return API.post(this.url, data);
  }

  update(id: number, data: T) {
    return API.patch(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return API.delete(`${this.url}/${id}`);
  }
}

// export default ApiClient;

interface IAgent {
  name: string;
  address: string;
  age: number;
}

class Agents extends ApiClient<IAgent> {
  constructor() {
    super('agents');
  }
}

interface IContactNotes {
  summery: string;
  createdDate: Date;
  isDone: boolean;
}

class ContactNotes extends ApiClient<IContactNotes> {
  contactId: number;
  constructor() {
    super('notes');
    this.contactId = null;
  }

  get url() {
    return `${this.apiVersion}/contacts/${this.contactId}/notes`;
  }

  show(contactId: number) {
    this.contactId = contactId;
    return super.get();
  }

  create(content: IContactNotes) {
    return super.create(content);
  }
}

async function test() {
  let testContact = new ContactNotes();
  await testContact.show(1);
}

test();
