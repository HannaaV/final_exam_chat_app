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
    if (value.trim().length === 0) {
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
    if (drone.clientId === member.id) {
      el.appendChild(document.createTextNode(name + ' * '));
    } else {
      el.appendChild(document.createTextNode(name));
    }
    el.className = 'member';
    el.style.color = color;
    return el;
  }
  
  export function updateMembersDOM(members) {
    if (members.length > 1) {
      DOM.membersCount.innerText = `${members.length} users in the mood to chat:`;
    }
    else {
      DOM.membersCount.innerText = `${members.length} user in the mood to chat:`;
    }
    DOM.membersList.innerHTML = '';
    members.forEach(member =>
      DOM.membersList.appendChild(createMemberElement(member))
    );
  }
  
  function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createElement('br'));
  el.appendChild(document.createTextNode(text));
  if (drone.clientId === member.id) {
    el.className = 'message outgoing';
  } else {
    el.className = 'message incoming';
  }
  return el;
}
  
  export function addMessageToListDOM(text, member) {
    const el = DOM.messages;
    el.appendChild(createMessageElement(text, member));
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }