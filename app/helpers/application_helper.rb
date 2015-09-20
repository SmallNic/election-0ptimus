module ApplicationHelper


  def model_fields
    # which fields to display and sort by
    [:first_name, :last_name, :address, :city, :state, :zip]
  end

  def display_search_results(objects)
    objects.each_with_object('') do |object, string|
      string << content_tag(:tr, display_search_results_row(mod_fields, object))
    end
  end

  def display_search_results_row(object)
    model_fields.each_with_object('') do |field, string|
      string << content_tag(:td, object.send(field))
    end
    .html_safe
  end

end
