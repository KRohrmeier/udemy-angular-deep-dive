import {
    Attribute,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {Course} from '../../model/course';
import {CoursesService} from '../courses.service';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements  OnInit {
  @Input()
  course: Course;

  @Output('courseSelected')
  courseEmitter = new EventEmitter<Course>();

  constructor(private coursesService: CoursesService,
    @Attribute('type') private type: string) {
  }

  ngOnInit() {}

  onTitleChanged(newTitle: string) {
    this.course.description = newTitle;
  }

  onCourseView() {
    this.courseEmitter.emit(this.course);
    console.log('Course-card component, course id', this.course.id);
  }
}
