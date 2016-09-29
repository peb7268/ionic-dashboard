import { Pipe, PipeTransform } from "@angular/core";
 
@Pipe({
    name: "filterByName",
    pure: false
})


export class ProjectFilterPipe implements PipeTransform {
     //{[field: string]: any}
    transform(items: Array<any>, projectNameFilter): any {
        var nameQuery = projectNameFilter.toLowerCase();
        
        var filterdSet = items.filter(item => {
            var matchFound = item.name.toLowerCase().indexOf(nameQuery);

            if(matchFound > -1) {
                return true;
            } else {
                return false;
            }
        });

        return filterdSet;
    }
}