let newButton = function () {

  let name = $('input[name=new]').val()

  if (!name) {
    console.log('no name')
    return
  }

  let todo = {
    name: name
  };

  $.ajax({
    data: todo,
    url: '/todos/',
    type: 'post',
    dataType: 'json',
    cache: false,
    success: function (newTodo) {

      $.get("templates/todo.html", function (template) {
        let todoLi = $(template);
        let todoName = todoLi.find('h4.todo-name')
        let todoEdit = todoLi.find('input.todo-edit')

        todoName.text(newTodo.name)
        todoEdit.val(newTodo.name)

        todoLi.attr("data-id", newTodo.id)
        $('ul#todoList').prepend(todoLi);
        $('#new-input').val('')
      })
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('error' + textStatus + 'errorThrown');
    }
  })

}

let doneButton = function () {
  console.log($($(this).parents('li')[0]))

  let todoLi = $($(this).parents('li')[0])
  let todoId = todoLi.data('id')

  $.ajax({
    url: `/todos/${todoId}/done`,
    type: 'put',
    cache: false,
    success: function (check) {
      if (check.success) {
        todoLi.find('button.edit-button').remove()
        todoLi.find('button.done-button').text("Todo")
        todoLi.find('button.done-button').removeClass('done-button').addClass('todo-button')
        $('#doneList').prepend(todoLi)
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('error' + textStatus + 'errorThrown');
    }
  })


}

let todoButton = function () {
  console.log($($(this).parents('li')[0]))

  let todoLi = $($(this).parents('li')[0])
  let todoId = todoLi.data('id')

  $.ajax({
    url: `/todos/${todoId}/cancel-done`,
    type: 'put',
    cache: false,
    success: function (check) {
      if (check.success) {
        let editButton = $('<button class="btn btn-success edit-button" type="button">edit</button>')
        let detailButton = $(todoLi.find('button.detail-button'))

        editButton.insertAfter(detailButton)

        todoLi.find('button.todo-button').text("Done")
        todoLi.find('button.todo-button').removeClass('todo-button').addClass('done-button')
        $('#todoList').prepend(todoLi)
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('error' + textStatus + 'errorThrown');
    }
  })


}

let detailButton = function () {
  console.log('detail clicked')

  let todoId = $($(this).parents('li')[0]).data('id')

  $.ajax({
    url: `/todos/${todoId}`,
    type: 'get',
    cache: false,
    success: function (todo) {
      let modalDetail = $('#modalDetail')
      let todoDetail = modalDetail.find('#todoDetail')
      let todoCreateDate = modalDetail.find('#todoCreateDate')
      todoDetail.text(todo.name)
      todoCreateDate.text(`Added at ${todo.createdAt}`)
      $('#modalDetail').modal('show')
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('error' + textStatus + 'errorThrown');
    }
  })

}

let editButton = function () {
  console.log('edit clicked')

  let todoLi = $($(this).parents('li')[0])

  todoLi.toggleClass("editMode")

}

let todoEdit = function () {

  let todoLi = $($(this).parents('li')[0])
  let todoId = todoLi.data('id')
  let todoName = todoLi.find('h4.todo-name')
  let newName = $(this).val()

  $.ajax({
    data: { name: newName },
    url: `/todos/${todoId}`,
    type: 'put',
    dataType: 'json',
    cache: false,
    success: function (check) {
      if (check.success) {
        todoName.text(newName)
        todoLi.toggleClass("editMode")
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('error' + textStatus + 'errorThrown');
    }
  })
}

let deleteButton = function () {

  let todoId = $($(this).parents('li')[0]).data('id')

  console.log('delete clicked')
  $.ajax({
    url: `/todos/${todoId}/delete`,
    type: 'delete',
    cache: false,
    success: function (check) {
      if (check.success) {
        $($(`li[data-id=${todoId}]`)[0]).remove()
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('error' + textStatus + 'errorThrown');
    }
  })

}

$('#new-button').click(newButton)

//Todo list listeners
$('#todoList').on('click', '.done-button', doneButton)
$('#todoList').on('click', '.detail-button', detailButton)
$('#todoList').on('click', '.edit-button', editButton)
$('#todoList').on('change', '.todo-edit', todoEdit)
$('#todoList').on('click', '.delete-button', deleteButton)

//Done list listeners
$('#doneList').on('click', '.todo-button', todoButton)
$('#doneList').on('click', '.detail-button', detailButton)
$('#doneList').on('click', '.delete-button', deleteButton)