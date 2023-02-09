# WYSIWYG_editor

WYSIWYG Editor is a simple WYSIWYG drag-and-drop editor which should be able to

1. Drag and drop web elements to build an application (this will be called the Custom Application).
2. Change standard CSS properties such as colour, border and spacing.
3. Ability to change between edit and preview mode
4. Ability to display and export Custom Application source code.

## Packages

react-code-block: use to display code block for HTML source code review

react-route-dom: manage route for react, especially used with inline frame to embed Custom App document within the parent HTML document

## For Your Information

1. The position layout for all custom elements (text,button,image,input,form) that is dragged and dropped to the Custom App is **absolute**

   ``` css
   *{
     position:absolute
   }
   ```

2. When dragging the custom element to change it's position, the **centre**  of the custom element will be placed to the **mouse's position**.

3. APP doesn't support **MOBILE VIEWPORT**

4. To edit css styling for custom element, just click on the custom element within the edit mode. An edittor dialog will pop up. **ONLY APPLIED TO `<button>` ELEMENT**

In addition, if there is any issue or confusion, please contact me via rickywang1123@gmail.com
