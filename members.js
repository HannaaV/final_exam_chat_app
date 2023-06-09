import {drone} from "/script.js"

const DOM = {
    membersCount: document.querySelector('.members-count'),
    membersList: document.querySelector('.members-list'),
    messages: document.querySelector('.messages'),
    input: document.querySelector('.message-form__input'),
    form: document.querySelector('.message-form'),
  };
  
  DOM.form.addEventListener('submit', sendMessage);
  
  function sendMessage() {
    const value = DOM.input.value;
    if (value === '') {
      return;
    }
    DOM.input.value = '';
    drone.publish({
      room: 'observable-room',
      message: value,
    });
  }
  
  function createMemberElement(member) {
    const { name, color } = member.clientData;
    const el = document.createElement('div');
    el.appendChild(document.createTextNode(name));
    el.className = 'member';
    el.style.color = color;
    return el;
  }
  
  export function updateMembersDOM(members) {
    DOM.membersCount.innerText = `${members.length} users in room:`;
    DOM.membersList.innerHTML = '';
    members.forEach(member =>
      DOM.membersList.appendChild(createMemberElement(member))
    );
  }
  
  function createMessageElement(text, member) {
    const el = document.createElement('div');
    el.appendChild(createMemberElement(member));
    el.appendChild(document.createTextNode(text));
    el.className = 'message';
    return el;
  }
  
  export function addMessageToListDOM(text, member) {
    const el = DOM.messages;
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.appendChild(createMessageElement(text, member));
    if (wasTop) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  }